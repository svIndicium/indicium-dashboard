<template>
    <v-row>
        <v-col
            cols="12"
            md="3">
            <v-card>
                <v-card-title>Lidmaatschappen</v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
name: "ViewMemberMembership",
    props: [
        'member',
        'studyType',
        'mailAddresses'
    ]
}
</script>

<style scoped>

</style>
