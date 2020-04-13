<template>
    <div class="chat-container">
        <ChatLoader v-if="!isLoaded" />
        <div v-if="isLoaded">
            Hello
            <v-footer absolute color="grey lighten-3">
                <ChatInput />
            </v-footer>
        </div>
    </div>
</template>
<script>
import ChatLoader from './ChatLoader';
import ChatInput from './ChatInput';

export default {
    name: "ChatContainer",
    components: {
        ChatLoader, ChatInput
    },
    data() {
        return {
            isLoaded: true
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