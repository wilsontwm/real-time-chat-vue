<template>
    <v-navigation-drawer
        v-if="showcontact"
        app
        clipped
        right
        light
    >
        <div class="contacts-container">
            <h3 class="overline">All contacts</h3>

            <v-text-field
                v-model="search"
                outlined
                dense
                label="Search"
                prepend-inner-icon="search"
                class="mt-2"
            ></v-text-field>
            <ContactList :searchInput="search" />            
        </div>
    </v-navigation-drawer>
</template>

<script>
import ContactList from './ContactList';

export default {
    name: "ContactContainer",
    props: ['showcontact'],
    data() {
        return {
            search: ''
        }
    },
    components: {
        ContactList
    }
}
</script>
<style scoped>
    .contacts-container {
        padding: 12px 18px;
    }
</style>