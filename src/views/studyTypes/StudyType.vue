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
                        Studierichtingen
                        <CreateStudyTypeModal v-if="hasPermission('ledenadministratie-api', 'update-studytypes')"></CreateStudyTypeModal>
                    </v-card-title>
                    <v-data-table :headers="table.headers" :items="studyTypes">
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {FETCH_STUDY_TYPES} from "@/store/actions";
import Breadcrumbs from "@/components/Breadcrumbs";
import CreateStudyTypeModal from "@/views/studyTypes/CreateStudyTypeModal";

export default {
    name: 'StudyType',
    components: {
        CreateStudyTypeModal,
        Breadcrumbs,
    },
    data: () => ({
        error: null,
        table: {
            headers: [
                {
                    text: 'Naam',
                    value: 'name'
                },
                {
                    text: 'Afkorting',
                    value: 'shortName'
                },
            ]
        }
    }),
    methods: {
        async requestData() {
            await this.$store.dispatch(FETCH_STUDY_TYPES);
        },
        hasPermission(resource, role) {
            return this.$store.getters.hasPermission(resource, role);
        },
    },
    async mounted() {
        await this.requestData();
    },
    computed: {
        studyTypes() {
            return this.$store.state.studyTypes.studyTypes;
        },
        studyTypesLength() {
            return this.$store.state.studyTypes.studyTypesLength;
        },
        isLoading() {
            return this.$store.state.studyTypes.isLoading;
        },
    }
};
</script>

<style lang="scss" scoped>
</style>
