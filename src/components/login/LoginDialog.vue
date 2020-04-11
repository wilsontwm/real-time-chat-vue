<template>
    <v-dialog v-model="dialog" persistent max-width="468">
      <v-card>
        <v-card-title class="headline">Login using Google account</v-card-title>        
        <v-card-text>Please do not send confidential information. Any message leaked will not be held responsible.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="handleLogin">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "LoginDialog",
    props: [],
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user,
            statusState: state => state.status,
        }),
        dialog: function() {
            return !this.userState || Object.keys(this.userState).length === 0;
        }
    },
    created() {

    },
    methods: {
        ...mapActions('userModule', ['login']),
        async handleLogin(e) {
            this.login();
        }
    }
}
</script>