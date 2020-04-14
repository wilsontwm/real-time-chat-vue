<template>
    <v-dialog v-model="roomDialog" max-width="468">
        <template v-slot:activator="{ on }">
            <v-btn
                v-on="on"
                color="pink"
                dark
                small
                absolute
                bottom
                left
                fab
                style="margin-bottom: 50px"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">Create new chat room</v-card-title>        
            <v-container>
                <v-select
                    v-model="userIDs"
                    :items="userValues"
                    attached
                    chips
                    label="Users"
                    multiple
                ></v-select>
            </v-container>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="handleCreateChat">Create Now</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "RoomDialog",
    data() {
        return {
            roomDialog: false,
            userIDs: [],
        }
    },
    computed: {
        ...mapState('contactModule', {
            allUsers: state => state.users
        }),
        ...mapState('userModule', {
            user: state => state.user
        }),
        userValues() {
            const values = [];
            if(this.user) {
                for(var i = 0; i < this.allUsers.length; i++) {
                    var user = this.allUsers[i];
                    if(user.id != this.user.ID) {
                        var value = {text: user.name, value: user.id};
                        values.push(value);
                    }
                }
            }            
            
            return values;
        }
    },
    methods: {
        ...mapActions('roomModule', ['createChatRoom', 'selectRoom', 'clearRoom']),
        async handleCreateChat(e) {
            const {userIDs} = this;
            if(userIDs.length > 0) {                
                const resp = await this.createChatRoom({userIDs});
                if(resp.success) {
                    // Clear the room selection first
                    this.clearRoom();

                    // Select the room again
                    var data = {
                        room: resp.roomID,
                        targetUser: null,
                        currentUser: null
                    };

                    this.selectRoom(data);
                }
            }
            this.clearSelection();
            this.roomDialog = false;
        },
        clearSelection() {
            this.userIDs = [];
        }
    }
}
</script>