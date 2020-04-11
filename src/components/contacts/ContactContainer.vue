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
            <v-divider></v-divider>

            <v-text-field
                outlined
                dense
                label="Search"
                prepend-inner-icon="search"
                class="mt-2"
            ></v-text-field>
        </div>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "ContactContainer",
    props: ['showcontact'],
}
</script>
<style scoped>
    .contacts-container {
        padding: 12px 18px;
    }
</style>