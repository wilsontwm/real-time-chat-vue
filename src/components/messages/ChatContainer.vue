<template>
    <div class="chat-container">
        <ChatList />
        <v-app-bar bottom fixed app height="140" color="grey lighten-2" class="chat-input-container">
            <ChatInput />
        </v-app-bar>
    </div>
</template>
<script>
import ChatInput from './ChatInput';
import ChatList from './ChatList';

export default {
    name: "ChatContainer",
    components: {
        ChatInput, ChatList
    }
}
</script>
<style scoped>
.chat-container {
    height: inherit;
}
</style>