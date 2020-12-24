<template>
    <div>
        <h2>Mailadressen</h2>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error" class="table-container">
            <div class="header">Mailadres</div>
            <div class="header">Status</div>
            <div class="header">Nieuwsbrief status</div>
            <template v-for="(mailAddress, idx) in mailAddresses" >
                <div v-bind:key="'adres' + idx" class="cell">{{mailAddress.address}}</div>
                <div v-bind:key="'verified' + idx" class="cell">
                    <StatusLabel v-if="mailAddress.verifiedAt !== null" status="success" :title="`Bevestigd op ${getPrettyDateTime(mailAddress.verifiedAt)}`">Bevestigd</StatusLabel>
                    <StatusLabel v-else status="warning" :title="`Bevestiging verstuurd op ${getPrettyDateTime(mailAddress.verificationRequestedAt)}`">Nog niet bevestigd</StatusLabel>
                </div>
                <div v-bind:key="'newsletter' + idx" class="cell">
                    <StatusLabel v-if="!!mailAddress.receivesNewsletter" status="success">Ontvangt nieuwsbrief</StatusLabel>
                    <StatusLabel v-else status="warning">Ontvangt geen nieuwsbrief</StatusLabel>
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
            <Button :callback="getMailAddresses" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Icon from '../../components/Icon';
    import Button from '../../components/button';
    import Loading from '@svindicium/indicium-components';
    import StatusLabel from '../../components/StatusLabel';

    export default {
        name: 'ViewMailAddresses',
        components: {
            StatusLabel,
            Icon,
            Button,
            Loading,
        },
        data: () => ({
            mailAddresses: [],
            error: null,
            loading: false,
        }),
        methods: {
            async getMailAddresses() {
                this.loading = true;
                this.error = null;
                try {
                    const { data } = await this.$api.get(`/members/${this.$keycloak.subject}/mailaddresses`);
                    this.mailAddresses = data;
                } catch (e) {
                    this.error = e;
                }
                this.loading = false;
            },
            getPrettyDateTime(dateString) {
                return this.$utils.getPrettyDateTime(dateString);
            }
        },
        async created() {
            await this.getMailAddresses();
        },
        computed: {
            errorMessage() {
                if (this.error.status === 404) {
                    return "Profiel niet gevonden.";
                } else if (this.error.status === 403) {
                    return "Verboden toegang.";
                }
                return this.error.message;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/table";
    @import "src/assets/scss/error";
    .table-container {
        @extend .table-container;
        grid-template-columns: 2fr 1fr 2fr;
    }
</style>
