<template>
    <div class="chat-container">
        <ChatLoader v-if="!isLoaded" />
        <div v-if="isLoaded">
            <ChatHeader />
        </div>
    </div>
</template>
<script>
import ChatLoader from './ChatLoader';
import ChatHeader from './ChatHeader';

export default {
    name: "ChatContainer",
    components: {
        ChatLoader, ChatHeader
    },
    data() {
        return {
            isLoaded: false
        }
    },
    created() {
        console.log("Creating the container");
    }
}
</script>
<style scoped>
.chat-container {
    height: inherit;
}
</style>