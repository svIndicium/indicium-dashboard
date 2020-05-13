<template>
    <div>
        <h2>Activiteiten</h2>
        <div class="buttons">
            <ButtonGroup :buttons="getButtons"></ButtonGroup>
            <Button v-if="$auth.hasPermission('eventmanager/write:event')" :callback="() => $router.push({name: 'CreateEvent'})" size="l">Nieuwe activiteit</Button>
        </div>
        <div v-if="loading">
            <Loading />
        </div>
        <div class="calendar" v-else-if="view === 'calendar'">
            <EventCalendar :events="events" />
        </div>
        <div v-else-if="view === 'cards'">
            <EventCardGrid :events="events" />
        </div>
        <div v-else>
            <EventList :events="events" />
        </div>
    </div>
</template>

<script>
    import Button from '../../components/button';
    import EventCalendar from './EventCalendar';
    import EventCardGrid from './EventCardGrid';
    import EventList from './EventList';
    import ButtonGroup from '../../components/ButtonGroup';
    import Loading from '@svindicium/indicium-components';
    export default {
        name: 'EventDashboard',
        components: { ButtonGroup, EventList, EventCardGrid, EventCalendar, Button, Loading },
        data: () => ({
            events: [],
            loading: false,
            view: localStorage.getItem('defaultEventView') || 'calendar',
        }),
        methods: {
            async getEvents() {
                const { data } = await this.$api.get('/events');
                this.events = data;
            },
            toggleView(viewName) {
                this.view = viewName;
                localStorage.setItem('defaultEventView', viewName);
            }
        },
        computed: {
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
            }
        },
        async mounted() {
            this.loading = true;
            await this.getEvents();
            this.loading = false;
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
