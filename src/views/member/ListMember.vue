<template>
    <div>
        <h2>Ledenoverzicht</h2>
        <Button route-name="memberImport">Importeer gebruiker</Button>
        <div v-if="membersState.isLoading">
            <Loading />
        </div>
        <div v-else-if="!error" class="table-container">
            <div class="header">Voornaam</div>
            <div class="header">Achternaam</div>
            <div class="header">Status</div>
            <div class="header">Acties</div>
            <template v-for="(member, idx) in membersState.members">
                <div v-bind:key="'firstName' + idx">{{member.memberDetails.name.firstName}}</div>
                <div v-bind:key="'lastName' + idx">{{getFullLastName(member.memberDetails.name)}}</div>
                <div v-bind:key="'status' + idx"><StatusLabel status="success">Actief</StatusLabel></div>
                <router-link v-bind:key="'actions' + idx" :to="{name: 'memberView', params: {memberId: member.id }}"><Icon type="pencil" /></router-link>
            </template>
        </div>
        <div v-else>
            <div class="errorcontainer">
                <Icon type="alert-circle" class="icon" />
                <span class="message">
                    {{ errorMessage }}
                </span>
            </div>
            <Button :callback="requestData" size="l" class="button"><Icon type="refresh" class="buttonicon" /> Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Loading from '../../components/Loading';
    import Icon from '../../components/Icon';
    import Button from '../../components/button';
    import StatusLabel from '../../components/StatusLabel';
    import {FETCH_MEMBERS} from "@/store/actions";

    export default {
        name: "memberOverview",
        components: { StatusLabel, Button, Icon, Loading },
        data: () => ({
            error: null,
        }),
        methods: {
            getFullLastName(name) {
                if (name.middleName) {
                    return `${name.middleName} ${name.lastName}`;
                }
                return `${name.lastName}`;
            },
            async requestData() {
                await this.$store.dispatch(FETCH_MEMBERS);
            }
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
