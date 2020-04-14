<template>
    <v-container class="chat-input">
        <v-textarea
          v-model.trim="message"
          v-on:keyup.enter.exact="submitHandler"
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
import { mapState, mapActions } from 'vuex';

export default {
    name: "ChatInput",
    data () {
        return {
            message: ''
        }
    },
    methods: {
        ...mapActions('roomModule', ['sendMessage']),
        async submitHandler(e) {
            if(this.message.length > 0) {
                const {message} = this;
                this.sendMessage({message}); 
            }   
            this.resetMessage();        
        },
        resetMessage() {
            this.message = '';
        }
    }
}
</script>