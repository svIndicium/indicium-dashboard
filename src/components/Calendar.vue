<template>
    <FullCalendar
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
        :events="items"
        :firstDay="1"
        :eventTimeFormat="{hour: 'numeric', minute: '2-digit', hour12: false}"
        height="parent"
    />
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
        data: () => ({
            calendarPlugins: [dayGridPlugin],
        }),
    }
</script>

<style lang="scss">
    @import "~@fullcalendar/core/main.css";
    @import "~@fullcalendar/daygrid/main.css";

    .fc-toolbar h2 {
        font-size: 1.2rem !important;
    }
</style>
