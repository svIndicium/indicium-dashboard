`<template>
    <div>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <h2>{{event.title}}</h2>
            <p>{{event.description}}</p>
            <Button v-if="event.url !== ''" size="l" :url="event.url">Meld je aan!</Button>
            <ButtonGroup :buttons="getActionButtons" />
        </div>
    </div>
</template>

<script>
    import { Loading } from '@svindicium/indicium-components';
    import Button from '../../components/button';
    import ButtonGroup from '../../components/ButtonGroup';

    export default {
        name: 'ViewEvent',
        components: {
            Loading,
            Button,
            ButtonGroup,
        },
        data: () => ({
            event: {},
            error: null,
            loading: false,
        }),
        methods: {
            async getEvent() {
                this.error = null;
                const eventId = this.$route.params.eventId;
                const { data } = await this.$api.get(`/events/${eventId}`);
                this.event = data;
            },
            async shareEvent() {
                try {
                    await navigator.share({
                        url: this.currentPageUrl,
                        title: this.event.title,
                        text: this.event.description,
                    })
                } catch (e) {
                    this.error = e;
                }
            },
            async copyToClipboard() {
                try {
                    await navigator.clipboard.writeText(this.currentPageUrl);
                } catch (e) {
                    this.error = e;
                }
            },
        },
        computed: {
            getActionButtons() {
                const buttons = [];
                if (navigator.share) {
                    buttons.push(
                        {
                            icon: 'share',
                            label: 'Deel',
                            callback: () => { this.shareEvent() },
                        }
                    );
                } else if (navigator.clipboard) {
                    buttons.push(
                        {
                            icon: 'clipboard',
                            label: 'Kopieer link',
                            callback: () => { this.copyToClipboard() },
                        }
                    );
                }
                if (this.$auth.hasPermission("eventmanager/write:event")) {
                    buttons.push({
                        icon: 'urgent',
                        label: 'Promoot',
                        callback: () => {},
                    });
                }
                return buttons;
            },
            currentPageUrl() {
                return window.location.href;
            }
        },
        async created() {
            this.loading = true;
            await this.getEvent();
            this.loading = false;
        }
    };
</script>

<style lang="scss" scoped>

</style>
`
