<template>
    <div class="contact">
        <v-list-item two-line class="px-0">
            <v-badge
                bordered
                bottom
                :color="statusColor"
                dot
                offset-x="10"
                offset-y="10"
                class="mr-2" 
            >
                <v-avatar size="38">
                    <img :src="`${user.photoUrl}`" :alt="`${user.name}`" />
                </v-avatar>
            </v-badge>

            <v-list-item-content>
                <v-list-item-title class="body-2">{{user.name}}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>
<script>
export default {
    name: "Contact",
    props: ["user", "online"],
    computed: {
        statusColor() {
            return this.online ? "green" : "grey";
        }
    }
}
</script>
<style scoped>
.contact {
    cursor: pointer;
}
.contact:hover {
    background-color: #eeeeee;
}
</style>