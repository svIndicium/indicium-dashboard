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
                <v-card>
                    <v-card-title>{{ event.title }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col
            cols="4">
                <v-card>
                    <v-img :src="event.image" ></v-img>
                    <v-card-text v-text="event.description"></v-card-text>
                </v-card>
            </v-col>
            <v-col
            cols="2">
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-text>
                                <v-text-field :value="this.$utils.getPrettyDateTime(event.start)" label="Begint op" disabled></v-text-field>
                                <v-text-field :value="this.$utils.getPrettyDateTime(event.end)" label="Eindigt op" disabled></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-text>
                                <template v-if="event.url === ''">Je hoeft je voor deze activiteit niet in te schrijven!</template>
                                <v-btn :disabled="event.url === ''" color="primary" :href="event.url" target="_blank" plain>Inschrijven</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-text>
                                <v-btn @click="shareEvent" color="primary" plain>Deel deze activiteit</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
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
