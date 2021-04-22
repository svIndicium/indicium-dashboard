<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <Breadcrumbs />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Ledenoverzicht
                    </v-card-title>
                    <v-data-table :headers="table.headers" :items="members">
                        <template v-slot:item.createdAt="{ item }">
                            {{ $utils.getPrettyDateTime(item.memberDetails.createdAt) }}
                        </template>
                        <template v-slot:item.memberDetails.dateOfBirth="{ item }">
                            {{ $utils.getPrettyDate(item.memberDetails.dateOfBirth) }}
                        </template>
                        <template v-slot:item.lastName="{ item }">
                            {{ $utils.getFullLastName(item.memberDetails.name) }}
                        </template>
                        <template v-slot:item.studyType="{ item }">
                            {{ getStudyTypeById(item.memberDetails.studyTypeId).name }}
                        </template>
                        <template v-slot:item.status="">
                            <v-chip color="success">
                                Actief
                            </v-chip>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-btn icon :to="{name: 'MemberViewInfo', params: {memberId: item.id}}"><v-icon>mdi-pencil</v-icon></v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {FETCH_MEMBERS, FETCH_STUDY_TYPES} from "@/store/actions";
    import Breadcrumbs from "@/components/Breadcrumbs";

    export default {
        name: "Member",
        components: { Breadcrumbs },
        data: () => ({
            table: {
                headers: [
                    {
                        text: 'Voornaam',
                        value: 'memberDetails.name.firstName'
                    },
                    {
                        text: 'Achternaam',
                        value: 'lastName'
                    },
                    {
                        text: 'Geboortedatum',
                        value: 'memberDetails.dateOfBirth'
                    },
                    {
                        text: 'Studierichting',
                        value: 'studyType'
                    },
                    {
                        text: 'Status',
                        value: 'status'
                    },
                    {
                        text: 'Acties',
                        value: 'actions'
                    },
                ]
            }
        }),
        methods: {
            getStudyTypeById(studyTypeId) {
                return this.$store.getters.studyTypeById(studyTypeId) || {};
            },
            async requestData() {
                await this.$store.dispatch(FETCH_MEMBERS);
                await this.$store.dispatch(FETCH_STUDY_TYPES);
            },
        },
        async mounted() {
            await this.requestData();
        },
        computed: {
            membersState() {
                return this.$store.state.members;
            },
            members() {
                return this.$store.state.members.members;
            },
            membersLength() {
                return this.$store.state.members.membersLength;
            },
            isLoading() {
                return this.$store.state.members.isLoading;
            },
            errorMessage() {
                if (this.error.message === 'Network Error') {
                    return 'Netwerk fout';
                }
                return this.error.message;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/table";
    @import "src/assets/scss/error";
    .table-container {
        @extend .table-container;
        grid-template-columns: 1fr 1fr 64px 32px;
    }
</style>
