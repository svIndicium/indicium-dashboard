<template>
    <FullCalendar :options="calendarOptions" />
</template>

<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'

    export default {
        components: {
            FullCalendar
        },
        props: {
            items: {
                type: Array,
                default: () => ([])
            }
        },
        methods: {
            onEventClick(args) {
                this.$emit('eventClick', args);
            }
        },
        data() {
            return {
                calendarOptions: {
                    plugins: [dayGridPlugin],
                    initialView: 'dayGridMonth',
                    eventClick: this.onEventClick,
                    height: 'parent',
                    eventTimeFormat: {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: false
                    },
                    firstDay: 1,
                    events: this.items
                },
            }
        },
    }
</script>

<style lang="scss">

    .fc-toolbar h2 {
        font-size: 1.2rem !important;
    }
</style>
