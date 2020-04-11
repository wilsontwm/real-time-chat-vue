<template>
    <div class="contact-list">
        <div v-if="isLoading">
            <v-skeleton-loader type="list-item-avatar-two-line" class="mx-auto"></v-skeleton-loader>
            <v-skeleton-loader type="list-item-avatar-two-line" class="mx-auto"></v-skeleton-loader>
        </div>
        <Contact v-for="user in filteredUsers" :key="user.id" :user="user" :online="user.online" />
    </div>
</template>
<script>
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
            isLoading: true,
            allUsers: [],
            onlineUsers: []
        }
    },
    computed: {
        sortedUsers() {
            var onlineUsers = [];
            var offlineUsers = [];
            var onlineIds = this.onlineUsers;

            for(var i = 0; i < this.allUsers.length; i++) {
                var user = this.allUsers[i];
                // For online users
                if(onlineIds.indexOf(this.allUsers[i].id) >= 0) {
                    user.online = true;
                    onlineUsers.push(user);
                } else {
                    // For offline users
                    user.online = false;
                    offlineUsers.push(user);
                }
            }

            return [...onlineUsers, ...offlineUsers];
        },
        filteredUsers() {
            return this.sortedUsers.filter(user => {
                return user.name.toLowerCase().includes(this.searchInput.toLowerCase()) || user.email.toLowerCase().includes(this.searchInput.toLowerCase());
            });
        }
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
            
            this.allUsers = users;
            this.isLoading = false;
        });

        // Get online users
        fb.firestore.collection("online")
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