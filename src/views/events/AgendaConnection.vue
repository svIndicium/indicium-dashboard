<template>
    <div>
        <h2>Koppelen met agenda</h2>
        <p>Wil je alle activiteiten van Indicium in je agenda zodat je niks vergeet? Dat kan nu automatisch door een koppeling met je agenda!</p>
        <div v-if="loading">
            <Loading />
        </div>
        <div>
            <div v-for="(studyType, idx) in studyTypes" :key="idx">
                <CheckBox :label="studyType.name" v-model="studyType.selected">{{studyType.name}}</CheckBox>
            </div>
            <Button
                size="l"
                :center="true"
                url=""
                @click.native="copyFeedLinkToClipboard"
            >
                Kopieër naar klembord
            </Button>
        </div>
    </div>
</template>

<script>
    import Loading from '../../components/Loading';
    import CheckBox from '../../components/CheckBox';
    import Button from '../../components/button';
    import {FETCH_STUDY_TYPES} from "@/store/actions";
    export default {
        name: 'AgendaConnection',
        components: {
            CheckBox,
            Loading,
            Button,
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
            studyTypes() {
                return this.$store.state.studyTypes.studyTypes;
            },
            iCalLink() {
                const selected = this.studyTypes.filter((studyType) => studyType.selected).map((studyType) => studyType.name);
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
