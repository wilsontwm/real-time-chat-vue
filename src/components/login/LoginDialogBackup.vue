<template>
    <v-dialog v-model="dialog" persistent max-width="468">
      <v-card>
        <v-card-title class="headline">Login to real time chat</v-card-title>        
        <v-card-text><v-icon color="orange darken-2">report</v-icon> Please do not send confidential information. All messages will be removed daily at midnight.</v-card-text>
        <v-card-text>
          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="handleSubmit">
                <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                    <v-text-field
                        v-model="user.name"
                        :error-messages="errors"
                        label="Name"
                        required
                    ></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                    <v-text-field
                        v-model="user.email"
                        :error-messages="errors"
                        label="Email"
                        required
                    ></v-text-field>
                </ValidationProvider>
                <div>
                  <v-btn type="submit" color="primary" :disabled="invalid || (statusState && statusState.loggingIn)" >Login</v-btn>
                </div>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

extend('email', {
    ...email,
    message: 'Email is not valid',
})

export default {
    name: "LoginDialogBackup",
    props: [],
    data() {
        return {
            user: {
                name: '',
                email: ''
            }
        }
    },
    computed: {
        ...mapState('userModule', {
            userState: state => state.user,
            statusState: state => state.status,
        }),
        dialog: function() {
            return (this.userState == undefined || !this.userState.Token);
        }
    },
    created() {

    },
    methods: {
        ...mapActions('userModule', ['login']),
        async handleSubmit(e) {
            const isValid = await this.$refs.observer.validate();
            if(isValid) {
                this.login(this.user);
            }
        }
    }
}
</script>