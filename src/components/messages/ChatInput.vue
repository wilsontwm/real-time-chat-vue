<template>
    <v-container class="chat-input">
        <v-textarea
          class="message"
          solo
          no-resize
          rows="2"
          name="message"
          label="Type 'Enter' to send message"
        ></v-textarea>
    </v-container>
</template>
<script>
export default {
    name: "ChatInput"
}
</script>
<style scoped>
.message {
    width: 100%;
}
</style>