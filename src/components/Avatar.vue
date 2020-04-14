<template>
    <div>
        <v-skeleton-loader
            v-if="isRequiresLogin"
            type="list-item-avatar-two-line"
            class="mx-auto"
        ></v-skeleton-loader>
        <v-list-item v-if="!isRequiresLogin" two-line class="px-0">
            <v-avatar class="mr-2" size="38">
                <img :src="`${photo}`" :alt="`${name}`" />
            </v-avatar>

            <v-list-item-content>
                <v-list-item-title>{{name}}</v-list-item-title>
                <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
            </v-list-item-content>


            <v-menu bottom left offset-y>
                <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>expand_more</v-icon>
                </v-btn>
                </template>

                <v-list>
                    <v-list-item class="item">
                        <v-list-item-title class="overline" @click="handleLogout"><v-icon size="18">exit_to_app</v-icon> Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-list-item>

        <v-divider></v-divider>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "Avatar",
    data() {
        return {            
        }
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        name: function() {
            return this.userState ? this.userState.Name : "";
        },
        email: function() {
            return this.userState ? this.userState.Email : "";
        },
        photo: function() {
            return this.userState ? this.userState.Photo : "";
        },
        isRequiresLogin: function() {
            return !this.userState || Object.keys(this.userState).length === 0;
        }
    },
    methods: {
        ...mapActions('userModule', ['logout']),
        handleLogout(e) {
            e.preventDefault();
            this.logout();
        }
    }
}
</script>
<style scoped>
    .item {
        min-height: 0;
    }
</style>