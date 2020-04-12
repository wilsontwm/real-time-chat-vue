<template>
    <div class="room-list">        
        <v-skeleton-loader
            v-if="!isLoaded"
            ref="skeleton"
            type="list-item-avatar-two-line"
            class="mx-auto"
        ></v-skeleton-loader>
        <Room v-for="room in sortedRooms" :key="room.id" :room="room" :active="room.active" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Room from './Room';
import fb from '@/firebase';

export default {
    name: "RoomList",
    components: {
        Room
    },
    data() {
        return {
            isLoaded: false,
            rooms: {}
        }
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        ...mapState('contactModule', {
            contacts: state => state.users
        }),
        ...mapState('roomModule', {
            roomID: state => state.activeRoom
        }),
        sortedRooms() {
            var activeRooms = [];
            var inactiveRooms = [];
            var rooms = this.rooms;

            for(var i = 0; i < rooms.length; i++) {
                var room = rooms[i];
                // Preprocessing: Build the room name and photo
                var names = [];
                var contacts = this.contacts.filter(val => {
                    // Remove self and filter contacts that are in the room
                    return this.userState.ID != val.id && room.users.indexOf(val.id) >= 0;
                });
                
                for(var j = 0; j < contacts.length; j++) {
                    names.push(contacts[j].name);                        
                }
                room.name = names.join(', ');

                if(room.isPrivate) {
                    room.photoUrl = contacts[0] ? contacts[0].photoUrl : "";
                }

                // For active room
                if(room.id == this.roomID) {
                    room.active = true;
                    activeRooms.push(room);
                } else {
                    // For inactive room
                    room.active = false;
                    inactiveRooms.push(room);
                }
            }

            return [...activeRooms, ...inactiveRooms];
        },
    },
    created() {
        // Get all the users
        fb.firestore.collection("rooms")
        .where("users", "array-contains", this.userState.ID)
        .onSnapshot((snapshot) => {
            const rooms = [];
            snapshot.forEach((doc) => {
                const room = doc.data();
                room.id = doc.id;
                rooms.push(room);
            });
            
            this.rooms = rooms;
            this.isLoaded = true;
        });
    }
}
</script>