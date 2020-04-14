<template>
    <v-list-item :key="chat.id">
        <v-list-item-avatar>
            <v-img :src="avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>{{senderName}}</v-list-item-title>
            <v-list-item-subtitle v-html="chat.message"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>            
            <v-list-item-action-text v-text="datetime"></v-list-item-action-text>
        </v-list-item-action>
    </v-list-item>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
    name: "Chat",
    props: ["chat"],
    computed: {
        ...mapState('roomModule', {
            users: state => state.users
        }),
        sender: function() {
            var users = this.users.filter((val) => {
                return val.id == this.chat.senderID;
            });

            return users.length > 0 ? users[0] : {};
        },
        avatar: function() {
            return this.sender ? this.sender.photoUrl : "";
        },
        senderName: function() {
            return this.sender ? this.sender.name : "Unknown";
        },
        datetime: function() {
            return moment(this.chat.timestamp.toDate()).format("h:mm a, Do MMM YYYY");
        }
    },
    mounted() {
        var element = document.getElementById("chat-list-container");
        if (typeof(element) != 'undefined' && element != null) {
            element.scrollTop = element.scrollHeight;
        }
    }
}
</script>