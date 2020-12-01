<template>
    <div>
        <h2>Ledenoverzicht</h2>
        <Button route-name="memberImport">Importeer gebruiker</Button>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error" class="table-container">
            <div class="header">Voornaam</div>
            <div class="header">Achternaam</div>
            <div class="header">Status</div>
            <div class="header">Acties</div>
            <template v-for="(member, idx) in members">
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
            <Button :callback="getMembers" size="l" class="button"><Icon type="refresh" class="buttonicon" /> Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Loading from '@svindicium/indicium-components';
    import Icon from '../../components/Icon';
    import Button from '../../components/button';
    import StatusLabel from '../../components/StatusLabel';

    export default {
        name: "memberOverview",
        components: { StatusLabel, Button, Icon, Loading },
        data: () => ({
            members: [],
            error: null,
            loading: false,
        }),
        methods: {
            async getMembers() {
                this.error = null;
                this.loading = true;
                try {
                    const { data } = await this.$api.get("/members");
                    this.members = data;
                } catch (e) {
                    this.error = e;
                }
                this.loading = false;
            },
            getFullLastName(name) {
                if (name.middleName) {
                    return `${name.middleName} ${name.lastName}`;
                }
                return `${name.lastName}`;
            }
        },
        async created() {
            await this.getMembers();
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
        grid-template-columns: 1fr 1fr 64px 32px;
    }
</style>
