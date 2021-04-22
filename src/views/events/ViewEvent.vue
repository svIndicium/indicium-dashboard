`<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <Breadcrumbs />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card v-if="event">
                    <v-card-title>{{ event.title }}</v-card-title>
                    <v-tabs>
                        <v-tab
                            :to="{name: 'ProfileViewInfo'}"
                        >
                            <v-icon>mdi-information</v-icon>
                        </v-tab>
                        <v-tab
                            :to="{name: 'ProfileViewMailAddresses'}"
                        >
                            <v-icon>mdi-at</v-icon>
                        </v-tab>
                        <v-tab
                            :to="{name: 'ProfileViewMemberships'}"
                        >
                            <v-icon>mdi-wallet-membership</v-icon>
                        </v-tab>
                        <v-tab
                            :to="{name: 'ProfileViewPayments'}"
                        >
                            <v-icon>mdi-currency-eur</v-icon>
                        </v-tab>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
        <router-view></router-view>
    </v-container>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import axios from 'axios';
import {EventService} from "@/services";

export default {
    name: 'ViewEvent',
    components: {
        Breadcrumbs,
    },
    data: () => ({
        eventId: null,
        event: null
    }),
    methods: {
        async getEvent() {
            this.event = await EventService.getEventById(this.eventId);
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
        hasPermission(resource, role) {
            return this.$keycloak.ready && this.$keycloak.hasResourceRole(role, resource);
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
            if (this.hasPermission("event-api", "manage-events")) {
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
        },
    },
    async mounted() {
        this.eventId = this.$route.params.eventId;
        await this.getEvent();
    }
};
</script>

<style lang="scss" scoped>

</style>
