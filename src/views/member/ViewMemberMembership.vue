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
                        {{ $utils.getPrettyDate(item.startDate) }}
                    </template>
                    <template v-slot:[`item.endDate`]="{ item }">
                        {{ $utils.getPrettyDate(item.endDate) }}
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
name: "ViewMemberMembership",
    props: [
        'member',
        'studyType',
        'mailAddresses',
        'memberships'
    ],
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
    }
}
</script>

<style scoped>

</style>
