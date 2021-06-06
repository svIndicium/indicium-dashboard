<template>
    <v-container>
        <v-card>
            <v-card-title>
                Koppelen met agenda
            </v-card-title>
            <v-card-text>
                Wil je alle activiteiten van Indicium in je agenda zodat je niks vergeet? Dat kan nu automatisch door een koppeling met je agenda!
                <Loading v-if="studyTypeState.isLoading"></Loading>
                <v-checkbox v-else v-for="(studyType, idx) in studyTypeState.studyTypes" :label="studyType.name" :key="idx" v-model="studyType.selected" value="studyType.shortName" dense></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    plain
                    color="primary"
                    @click="copyFeedLinkToClipboard"
                >
                    Kopieër link naar klembord
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import Loading from '../../components/Loading';
    import {FETCH_STUDY_TYPES} from "@/store/actions";
    export default {
        name: 'AgendaConnection',
        components: {
            Loading,
        },
        data: () => ({
            error: null,
            loading: false,
        }),
        async mounted() {
            await this.$store.dispatch(FETCH_STUDY_TYPES);
        },
        methods: {
            copyFeedLinkToClipboard() {
                this.copyToClipboard(this.iCalLink)
                    .then(() => {});
            },
            async copyToClipboard(text) {
                try {
                    await navigator.clipboard.writeText(text)
                } catch (e) {
                }
            }
        },
        computed: {
            studyTypeState() {
                return this.$store.state.studyTypes;
            },
            iCalLink() {
                const selected = this.studyTypes.filter((studyType) => studyType.selected).map((studyType) => studyType.shortName);
                const url = 'https://ics.indicium.hu/v1/ics'
                const categories = selected.join(",")
                if (selected.length === this.studyTypes.length) {
                    return url
                }
                return `${url}?categories=${categories}`
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
