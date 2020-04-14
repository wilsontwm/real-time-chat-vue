<template>
    <div v-on:click="selectUser" class="contact">
        <v-list-item two-line class="px-0">
            <v-badge
                bordered
                bottom
                :color="statusColor"
                dot
                offset-x="10"
                offset-y="10"
                class="mr-2" 
            >
                <v-avatar size="38">
                    <img :src="`${user.photoUrl}`" :alt="`${user.name}`" />
                </v-avatar>
            </v-badge>

            <v-list-item-content>
                <v-list-item-title class="body-2">{{user.name}}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "Contact",
    props: ["user", "online"],
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        statusColor() {
            return this.online ? "green" : "grey";
        }
    },
    methods: {        
        ...mapActions('roomModule', ['selectRoom', 'clearRoom']),
        selectUser: function(e) {
            // Clear the room selection first
            this.clearRoom();

            // Select the room again
            var data = {
                room: null,
                targetUser: this.user.id,
                currentUser: this.userState.ID
            };
            
            this.selectRoom(data);
        }
    }
}
</script>
<style scoped>
.contact {
    cursor: pointer;
}
.contact:hover {
    background-color: #eeeeee;
}
</style>