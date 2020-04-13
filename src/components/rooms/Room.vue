<template>
    <div v-on:click="selectRoomHandler" :class="`${status} room`">
        <v-list-item two-line class="px-0">
            <v-avatar size="38" class="mr-2" color="indigo">
                <v-icon v-if="!room.isPrivate" dark>mdi-account-circle</v-icon>
                <img v-if="room.isPrivate"  :src="`${room.photoUrl}`" :alt="`${room.name}`" />
            </v-avatar>

            <v-list-item-content>
                <v-list-item-title class="body-2">{{room.name}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "Room",
    props: ["room", "active"],
    computed: {
        ...mapState('roomModule', {
            roomID: state => state.activeRoom
        }),
        status() {
            return this.active ? "active" : "";
        }
    },
    methods: {        
        ...mapActions('roomModule', ['selectRoom', 'clearRoom']),
        selectRoomHandler: function(e) {
            if(this.roomID != this.room.id) {
                // Clear the room selection first
                this.clearRoom();

                // Select the room again
                var data = {
                    room: this.room.id,
                    targetUser: null,
                    currentUser: null
                };

                this.selectRoom(data);
            }
            
        }
    }
}
</script>
<style scoped>
.room {
    cursor: pointer;
}
.room.active, .room:hover {
    background-color: #eeeeee;
}
</style>