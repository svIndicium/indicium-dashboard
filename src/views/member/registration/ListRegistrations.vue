<template>
    <div>
        <h2>Aanmeldingen</h2>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error" class="table-container">
            <div class="header">Naam</div>
            <div class="header">Status</div>
            <div class="header">Acties</div>
            <template v-for="(registration, idx) in registrations">
                <div v-bind:key="'firstName' + idx">{{getFullName(registration.memberDetails.name)}}</div>
                <div v-bind:key="'status' + idx">
                    <StatusLabel status="error" v-if="registration.reviewStatus === 'PENDING'">Wachtend op mailverificatie</StatusLabel>
                    <StatusLabel status="success" v-else-if="registration.reviewStatus === 'APPROVED'">Ingestemd</StatusLabel>
                    <StatusLabel status="error" v-else-if="registration.reviewStatus === 'DENIED'">Weggestemd</StatusLabel>
                    <StatusLabel status="error" v-else>Onbekend</StatusLabel>
                </div>
                <div v-bind:key="'acties' + idx">
                    <router-link v-bind:key="'actions' + idx" :to="{name: 'registrationView', params: {registrationId: registration.id}}"><Icon type="pencil" /></router-link>
                </div>
            </template>
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
    import Loading from '@svindicium/indicium-components';
    import Icon from '../../../components/Icon';
    import StatusLabel from '../../../components/StatusLabel';
    import Button from '../../../components/button';
    import {FETCH_REGISTRATIONS} from "@/store/actions";

    export default {
        name: 'ListRegistrations',
        components: {
            Loading,
            Icon,
            StatusLabel,
            Button,
        },
        data: () => ({
            error: null,
            loading: false,
        }),
        methods: {
            async requestData() {
                await this.$store.dispatch(FETCH_REGISTRATIONS);
            },
            viewRegistration(registrationId) {
                this.$router.push({ name: "viewRegistration", params: { registrationId } });
            },
            getFullName(name) {
                return `${name.firstName} ${this.getFullLastName(name)}`;
            },
            getFullLastName(name) {
                if (name.middleName) {
                    return `${name.middleName} ${name.lastName}`;
                }
                return `${name.lastName}`;
            }
        },
        computed: {
            registrations() {
                return this.$store.state.registrations.registrations;
            }
        },
        async mounted() {
            await this.requestData();
        }
    };
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/table";
    @import "src/assets/scss/error";
    .table-container {
        @extend .table-container;
        grid-template-columns: 1fr 1fr 32px;
    }
</style>
