<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon class="mr-2" @click="showdrawer = !showdrawer"></v-app-bar-nav-icon>
        <v-img
          :src="require('./assets/logo.png')"
          alt="Real time chat"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          width="30"
        />
        <h4>Real time chat</h4>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click="showcontact = !showcontact">
          <v-icon>contacts</v-icon>
      </v-btn>
    </v-app-bar>
    <NavigationDrawer :showdrawer="showdrawer" />
    <LoginDialog />
    <v-content>
      <MessageContainer />
    </v-content>
    <ContactContainer :showcontact="showcontact" />
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer'
import LoginDialog from './components/login/LoginDialog'
import ContactContainer from  './components/contacts/ContactContainer'
import MessageContainer from './components/messages/MessageContainer'

export default {
  name: 'App',

  components: {
    NavigationDrawer,
    LoginDialog,
    ContactContainer,
    MessageContainer
  },

  data: () => ({
    showdrawer: true,
    showcontact: true
  }),
};
</script>
