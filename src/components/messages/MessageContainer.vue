<template>
    <div class="message-container">
        <div class="follow-height" v-if="!isRequiresLogin">
            <RoomNotSelected v-if="!isRoomSelected" />
            <ChatContainer v-if="isRoomSelected" />
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import RoomNotSelected from './RoomNotSelected';
import ChatContainer from './ChatContainer';

export default {
    name: "MessageContainer",
    components: {
        ChatContainer, RoomNotSelected
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        ...mapState('roomModule', {
            roomID: state => state.activeRoom
        }),
        isRequiresLogin: function() {
            return !this.userState || Object.keys(this.userState).length === 0;
        },
        isRoomSelected: function() {
            return this.roomID;
        }
    },
    methods: {
        ...mapActions('roomModule', ['clearRoom'])
    },
    created() {
        // Clear room selection
        this.clearRoom();
    }
}
</script>
<style scoped>
.message-container {
    height: 100%;
}
.follow-height {
    height: inherit;
}
</style>