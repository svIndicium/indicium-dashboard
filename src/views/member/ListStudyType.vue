<template>
    <div>
        <h2>Studierichtingen</h2>
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <Button route-name="studyTypeCreate" size="m" class="button" v-if="hasPermission('ledenadministratie-api', 'manage-studytypes')"><Icon type="plus" class="buttonicon"></Icon>Voeg toe</Button>
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
            <Button :callback="requestData" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Button from '../../components/button';
    import Loading from '@svindicium/indicium-components';
    import Icon from '../../components/Icon';
    import {FETCH_STUDY_TYPES} from "@/store/actions";

    export default {
        name: 'ListStudyType',
        components: {
            Button,
            Loading,
            Icon,
        },
        data: () => ({
            error: null,
        }),
        methods: {
            async requestData() {
                await this.$store.dispatch(FETCH_STUDY_TYPES);
            },
            hasPermission(resource, role) {
                if (!this.resourceAccess[resource]) return false;
                return this.resourceAccess[resource].roles.includes(role) ;
            },
        },
        async mounted() {
            await this.requestData();
        },
        computed: {
            resourceAccess() {
                return this.$store.state.user.resourceAccess;
            },
            studyTypes() {
                return this.$store.state.studyTypes.studyTypes;
            },
            studyTypesLength() {
                return this.$store.state.studyTypes.studyTypesLength;
            },
            isLoading() {
                return this.$store.state.studyTypes.isLoading;
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
        grid-template-columns: 1fr 1fr;
    }
</style>
