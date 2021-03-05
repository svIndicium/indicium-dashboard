<template>
    <div>
        <h2>Mailadressen</h2>
        <div v-if="mailAddressIsLoading">
            <Loading />
        </div>
        <div v-else class="table-container">
            <div class="header">Mailadres</div>
            <div class="header">Status</div>
            <div class="header">Nieuwsbrief status</div>
            <template v-for="(mailAddress, idx) in member.mailAddresses" >
                <div v-bind:key="'adres' + idx" class="cell">{{mailAddress.address}}</div>
                <div v-bind:key="'verified' + idx" class="cell">
                    <StatusLabel v-if="mailAddress.verifiedAt !== null" status="success" :title="`Bevestigd op ${this.$utils.getPrettyDateTime(mailAddress.verifiedAt)}`">Bevestigd</StatusLabel>
                    <StatusLabel v-else status="warning" :title="`Bevestiging verstuurd op ${this.$utils.getPrettyDateTime(mailAddress.verificationRequestedAt)}`">Nog niet bevestigd</StatusLabel>
                </div>
                <div v-bind:key="'newsletter' + idx" class="cell">
                    <StatusLabel v-if="!!mailAddress.receivesNewsletter" status="success">Ontvangt nieuwsbrief</StatusLabel>
                    <StatusLabel v-else status="warning">Ontvangt geen nieuwsbrief</StatusLabel>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import StatusLabel from '../../components/StatusLabel';
    import Loading from '../../components/Loading';

    export default {
        name: 'ViewMailAddresses',
        components: {
            StatusLabel,
            Loading,
        },
        computed: {
            member() {
                return this.$store.state.user.member;
            },
            mailAddressIsLoading() {
                return this.$store.state.user.mailAddressIsLoading;
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
