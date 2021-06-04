<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <Breadcrumbs />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                cols="12"
                md="8"
            >
                <v-card
                    class="mb-2"
                >
                    <v-card-title>
                        Activiteiten
                    </v-card-title>
                </v-card>
                <v-card>
                    <v-sheet height="64">
                        <v-toolbar
                            flat
                        >
                            <v-btn
                                outlined
                                class="mr-4"
                                color="grey darken-2"
                                @click="setToday"
                            >
                                Today
                            </v-btn>
                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="prev"
                            >
                                <v-icon small>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="next"
                            >
                                <v-icon small>
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>
                            <v-toolbar-title>
                                {{ calendarTitle }}
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-menu
                                bottom
                                right
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        outlined
                                        color="grey darken-2"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <span>{{ typeToLabel[type] }}</span>
                                        <v-icon right>
                                            mdi-menu-down
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="type = 'day'">
                                        <v-list-item-title>Day</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'week'">
                                        <v-list-item-title>Week</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'month'">
                                        <v-list-item-title>Month</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = '4day'">
                                        <v-list-item-title>4 days</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-toolbar>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar
                            ref="calendar"
                            v-model="focus"
                            color="primary"
                            :events="events"
                            :type="type"
                            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
                            @click:event="showEvent"
                            @click:date="viewDay"
                        ></v-calendar>
                    </v-sheet>
                </v-card>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
                <v-card>
                    <v-card-title>
                        Automatisch in je agenda?
                    </v-card-title>
                    <v-card-text>
                        Wil je alle activiteiten direct in je agenda zien? Importeer dan de Indicium agenda in jouw agenda!
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            plain
                            color="primary"
                            :to="{name: 'agendaConnection'}"
                        >
                            Lees meer
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Breadcrumbs from '../../components/Breadcrumbs';
import {FETCH_EVENTS} from "@/store/actions";
export default {
    name: 'Events',
    components: { Breadcrumbs },
    data: () => ({
        focus: '',
        type: 'month',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day',
            '4day': '4 Days',
        },
    }),
    methods: {
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        showEvent ({ nativeEvent, event }) {
            this.$router.push({name: 'EventView', params: event.toParams})
        },
        setToday () {
            this.focus = ''
        },
    },
    mounted() {
        this.$store.dispatch(FETCH_EVENTS);
    },
    computed: {
        events() {
            return this.$store.getters.events;
        },
        calendarTitle() {
            return this.$refs.calendar?.title || '';
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
