import { roomService } from '../_services/room.service';
const state = {activeRoom: null}

const actions = {
    async selectRoom({commit}, {room, currentUser, targetUser}) {
        // If the room has already been created, then set it as active room (usually triggered from selecting the chat room from left)
        var roomID;
        if(room) {
            roomID = room;
        } else {
            // Else check if there is existing chat room created for the user
            const roomResp = await roomService.get(currentUser, targetUser);

            if(roomResp.success) {
                roomID = roomResp.roomID;
            } else {
                const resp = await roomService.createPrivateChat(currentUser, targetUser);
                if(resp.success) {
                    roomID = resp.roomID;
                }
            }
        }

        commit('setActiveRoom', roomID);
    },
    clearRoom({commit}) {
        commit('clearRoom');
    }
}

const mutations = {
    setActiveRoom(state, room) {
        state.activeRoom = room;
    },
    clearRoom(state) {
        state.activeRoom = null;
    }
}

export const roomModule = {
    namespaced: true,
    state,
    actions,
    mutations
}