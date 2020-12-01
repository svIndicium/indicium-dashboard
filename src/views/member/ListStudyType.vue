<template>
    <div>
        <h2>Studierichtingen</h2>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <Button route-name="studyTypeCreate" size="m" class="button" v-if="$auth.hasPermission('ledenadministratie/write:study_type')"><Icon type="plus" class="buttonicon"></Icon>Voeg toe</Button>
            <div class="table-container">
                <div class="header">ID #</div>
                <div class="header">Naam</div>
                <template v-for="(studyType, idx) in studyTypes">
                    <div v-bind:key="'id' + idx">{{studyType.shortName}}</div>
                    <div v-bind:key="'name' + idx">{{studyType.name}}</div>
                </template>
            </div>
        </div>
        <div v-else>
            <div class="errorcontainer">
                <Icon type="alert-circle" class="icon" />
                <span class="message">
                    {{ errorMessage }}
                </span>
            </div>
            <Button :callback="getStudyTypes" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Button from '../../components/button';
    import Loading from '@svindicium/indicium-components';
    import Icon from '../../components/Icon';

    export default {
        name: 'ListStudyType',
        components: {
            Button,
            Loading,
            Icon,
        },
        data: () => ({
            loading: false,
            error: null,
            studyTypes: [],
        }),
        methods: {
            async getStudyTypes() {
                this.error = null;
                this.loading = true;
                try {
                    const { data } = await this.$api.get('/studytypes');
                    this.studyTypes = data;
                } catch (e) {
                    this.error = e;
                }
                this.loading = false;
            },
        },
        async created() {
            await this.getStudyTypes();
        },
        computed: {
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
        grid-template-columns: 1fr 1fr;
    }
</style>
