<template>
    <v-navigation-drawer
        v-modal="showdrawer"
        app
        clipped
        light
    >
        <v-list
            dense
            nav
            class="py-0"
            >
            <Avatar />
            <div class="overline mt-2 mb-2">Recent chats</div>
            <RoomList v-if="!isRequiresLogin" />
        </v-list>
        <RoomDialog />
        
    </v-navigation-drawer>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Avatar from './Avatar'
import RoomList from './rooms/RoomList'
import RoomDialog from './rooms/RoomDialog'

export default {
    name: "NavigationDrawer",
    props: ['showdrawer'],
    components: {
        Avatar, RoomList, RoomDialog
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        isRequiresLogin: function() {
            return !this.userState || Object.keys(this.userState).length === 0;
        }
    },
    data: function() {
        return {
            items: {}
        }
    }
}
</script>
<style lang="scss" scoped>

</style>