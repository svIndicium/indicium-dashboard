<template>
    <v-row justify="center">
        <v-dialog
            v-model="open"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    Voeg toe
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Nieuwe studierichting</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Naam"
                                    required
                                    v-model="studyType.name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Afkorting"
                                    required
                                    v-model="studyType.shortName"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error darken-1"
                        text
                        @click="resetForm"
                    >
                        Annuleer
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="saveStudyType"
                    >
                        Voeg toe
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {FETCH_STUDY_TYPES} from "@/store/actions";
import {StudyTypeService} from "@/services";

export default {
    name: "CreateStudyTypeModal",
    data: () => ({
        open: false,
        studyType: {
            name: '',
            shortName: ''
        }
    }),
    methods: {
        async saveStudyType() {
            await StudyTypeService.createStudyType(this.studyType);
            await this.$store.dispatch(FETCH_STUDY_TYPES);
            this.resetForm();
        },
        resetForm() {
            this.open = false;
            this.studyType = {
                name: '',
                shortName: ''
            }
        }
    }
}
</script>

<style scoped>

</style>
