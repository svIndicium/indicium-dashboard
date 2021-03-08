<template>
    <div>
        <h2>Activiteiten</h2>
        <div class="buttons">
            <ButtonGroup :buttons="getButtons"></ButtonGroup>
            <Button v-if="hasPermission('events-api', 'manage-events')" :callback="() => $router.push({name: 'CreateEvent'})" size="l">Nieuwe activiteit</Button>
        </div>
        <div v-if="loading">
            <Loading />
        </div>
        <div class="calendar" v-else-if="view === 'calendar'">
            <EventCalendar @eventSelected="getOnEventClick" />
        </div>
        <div v-else-if="view === 'cards'">
            <EventCardGrid @eventSelected="getOnEventClick" />
        </div>
        <div v-else>
            <EventList @eventSelected="getOnEventClick" />
        </div>
    </div>
</template>

<script>
    import Button from '../../components/button';
    import EventCalendar from './event-view/EventCalendar';
    import EventCardGrid from './event-view/EventCardGrid';
    import EventList from './event-view/EventList';
    import ButtonGroup from '../../components/ButtonGroup';
    import Loading from '../../components/Loading';
    import axios from 'axios';
    import {FETCH_EVENTS} from "@/store/actions";
    export default {
        name: 'EventDashboard',
        components: { ButtonGroup, EventList, EventCardGrid, EventCalendar, Button, Loading },
        data: () => ({
            loading: false,
            view: localStorage.getItem('defaultEventView') || 'calendar',
        }),
        methods: {
            // async getEvents() {
            //     const { data } = await this.$api.get('/events');
            //     this.events = data.map(event => ({
            //             ...event,
            //             url: `/activiteiten/${event.id}-${event.slug}`
            //         })
            //     );
            // },
            // async getEvents() {
            //     this.loading = true;
            //     const { data } = await axios.get('https://old.indicium.hu/json/events?filter[status]=published&page%5Bsize%5D=1000')
            //     const events = data.data
            //     // const today = new Date().getTime()
            //     const featureEvents = events
            //         // .filter(evt => new Date(evt.attributes.start).getTime() > today)
            //         .sort((eventA, eventB) => new Date(eventA.attributes.start) - new Date(eventB.attributes.start))
            //         .map(evt => ({
            //             id: evt.id,
            //             title: evt.attributes.title,
            //             description: this.stripHTMLFromString(evt.attributes.contentblocks[0].content),
            //             startDate: new Date(evt.attributes.start).getTime(),
            //             endDate: new Date(evt.attributes.end).getTime(),
            //             url: `/activiteiten/${evt.id}-${evt.attributes.slug}`,
            //             categories: evt.attributes.categories
            //         }))
            //     this.events = featureEvents;
            //     this.loading = false;
            // },
            async requestData() {
                await this.$store.dispatch(FETCH_EVENTS);
            },
            toggleView(viewName) {
                this.view = viewName;
                localStorage.setItem('defaultEventView', viewName);
            },
            getOnEventClick(event) {
                this.$router.push({name: 'ViewEvent', params: {eventId: event.id, eventName: event.title.toLowerCase()}})
            },
            hasPermission(resource, role) {
                return this.$keycloak.hasResourceRole(role, resource);
            },
        },
        computed: {
            isLoading() {
                return this.$store.state.events.isLoading;
            },
            getButtons() {
                return [
                    {
                        icon: 'calendar',
                        callback: () => this.toggleView('calendar'),
                    },
                    {
                        icon: 'grid',
                        callback: () => this.toggleView('cards'),
                    },
                    {
                        icon: 'columns',
                        callback: () => this.toggleView('list'),
                    },
                ];
            },
        },
        async mounted() {
            await this.requestData();
        }
    };
</script>

<style lang="scss" scoped>

    button {
        margin-left: 16px;
    }

    .buttons {
        display: flex;
    }

    .calendar {
        height: 70vh;
    }
</style>
