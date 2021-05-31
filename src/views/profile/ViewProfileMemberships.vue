<template>
    <v-row>
        <v-col
            cols="12"
            md="3">
            <v-card>
                <v-card-title>Lidmaatschappen</v-card-title>
                <v-data-table
                    :headers="table.headers"
                    :items="memberships"
                    ref="membershiptable"
                >
                    <template v-slot:[`item.startDate`]="{ item }">
                        {{ new Date(item.startDate).getUTCFullYear() }}
                    </template>
                    <template v-slot:[`item.endDate`]="{ item }">
                        {{ new Date(item.endDate).getUTCFullYear() }}
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip :color="getStatusColor(item.status)">
                            {{ getStatusText(item.status) }}
                        </v-chip>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "ViewProfileMemberships",
    data: () => ({
        table: {
            headers: [
                {
                    text: 'Beginjaar',
                    value: 'startDate'
                },
                {
                    text: 'Eindjaar',
                    value: 'endDate'
                },
                {
                    text: 'Status',
                    value: 'status'
                },
            ]
        }
}),
    methods: {
        getStatusText(status) {
            return {
                ACTIVE: 'Actief',
                PENDING: 'In afwachting',
                CANCELLED: 'Geannulleerd',
                SUSPENDED: 'Geschorst',
                DISCHARGED: 'Mislukt'
            }[status];
        },
        getStatusColor(status) {
            return {
                ACTIVE: 'green',
                PENDING: 'orange',
                CANCELLED: 'red',
                SUSPENDED: 'red',
                DISCHARGED: 'red'
            }[status];
        },
    },
    computed: {
        memberships() {
            return this.$store.state.user.member.memberships;
        }
    }
}
</script>

<style scoped>

</style>
