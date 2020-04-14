<template>
    <div class="contact-list">
        <div v-if="!isLoaded">
            <v-skeleton-loader type="list-item-avatar-two-line" class="mx-auto"></v-skeleton-loader>
            <v-skeleton-loader type="list-item-avatar-two-line" class="mx-auto"></v-skeleton-loader>
        </div>
        <Contact v-for="user in filteredUsers" :key="user.id" :user="user" :online="user.online" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Contact from './Contact';
import fb from '@/firebase';

export default {
    name: "ContactList",
    components: {
        Contact
    },
    props: ['searchInput'],
    data() {
        return {
            onlineUsers: []
        }
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        ...mapState('contactModule', {
            contactState: state => state
        }),
        sortedUsers() {
            var onlineUsers = [];
            var offlineUsers = [];
            var onlineIds = this.onlineUsers;

            if(this.contactState.users) {
                for(var i = 0; i < this.contactState.users.length; i++) {
                    var user = this.contactState.users[i];
                    // For online users
                    if(onlineIds.indexOf(this.contactState.users[i].id) >= 0) {
                        user.online = true;
                        onlineUsers.push(user);
                    } else {
                        // For offline users
                        user.online = false;
                        offlineUsers.push(user);
                    }
                }
            }            

            return [...onlineUsers, ...offlineUsers];
        },
        filteredUsers() {
            return this.sortedUsers.filter(user => {
                // Filter out self
                var valid = this.userState ? this.userState.ID != user.id : false;
                valid = valid && ( user.name.toLowerCase().includes(this.searchInput.toLowerCase()) || user.email.toLowerCase().includes(this.searchInput.toLowerCase()) );
                return valid;
            });
        },
        isLoaded() {            
            return this.contactState.users && this.contactState.users.length > 0;
        }
    },
    methods: {
        ...mapActions('contactModule', ['allContacts'])
    },
    created() {
        // Get all the users
        fb.firestore.collection("users")
        .onSnapshot((snapshot) => {
            const users = [];
            snapshot.forEach((doc) => {
                const user = doc.data();
                user.id = doc.id;
                users.push(user);
            });
            
            this.allContacts({users});
            this.isLoading = false;
        });

        // Get online users
        let datetime = new Date();
        datetime.setHours(datetime.getHours() - 1);
        
        fb.firestore.collection("online").where('loginAt', '>=', datetime)
        .onSnapshot((snapshot) => {
            const users = [];
            snapshot.forEach((doc) => {
                const user = doc.data();
                users.push(doc.id);
            });
            
            this.onlineUsers = users;
        });
    }
}
</script>