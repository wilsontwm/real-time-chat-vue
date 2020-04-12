<template>
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
    </v-container>
    
</template>
<script>
export default {
    name: "ChatLoader"
}
</script>