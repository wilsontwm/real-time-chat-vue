<template>
    <v-navigation-drawer
        v-if="showdrawer"
        app
        clipped
        light
    >
        <v-list
            dense
            nav
            class="py-0"
            >
            <Avatar />
            <div class="overline mt-2 mb-2">Recent chats</div>
            <v-skeleton-loader
                ref="skeleton"
                type="list-item-avatar-two-line"
                class="mx-auto"
            ></v-skeleton-loader>

            <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
import Avatar from './Avatar'

export default {
    name: "NavigationDrawer",
    props: ['showdrawer'],
    components: {
        Avatar
    },
    data: function() {
        return {
            items: {}
        }
    }
}
</script>
<style lang="scss" scoped>

</style>