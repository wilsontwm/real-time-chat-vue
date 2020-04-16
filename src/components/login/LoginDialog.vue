<template>
    <div>   
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
        <v-dialog v-model="loader" persistent max-width="468">
            <v-card>
            <v-container fill-height fluid>
                <v-row align="center"
                    justify="center">
                    <v-col align="center">
                        <v-progress-circular
                        :size="75"
                        color="primary"                
                        indeterminate
                        ></v-progress-circular>
                    </v-col>
                </v-row>
                <v-row align="center"
                    justify="center">
                    <v-col align="center">
                        <v-card-text>Please wait...</v-card-text>
                    </v-col>
                </v-row>
            </v-container>
            </v-card>
        </v-dialog>
    </div>
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
        loader: function() {
            return this.statusState && this.statusState.loggingIn;
        },
        dialog: function() {
            return (!this.userState || Object.keys(this.userState).length === 0)
                    && !(this.statusState && this.statusState.loggingIn);
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