<template>
    <div class="message-container">
        <div class="follow-height" v-if="!isRequiresLogin">
            <RoomNotSelected />
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import MessageHeader from './MessageHeader';
import RoomNotSelected from './RoomNotSelected';

export default {
    name: "MessageContainer",
    components: {
        MessageHeader, RoomNotSelected
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user
        }),
        isRequiresLogin: function() {
            return !this.userState || Object.keys(this.userState).length === 0;
        }
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