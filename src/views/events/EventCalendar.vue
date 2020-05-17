<template>
    <Calendar :items="items" />
</template>

<script>
    import Calendar from '../../components/Calendar';

    export default {
        name: 'EventCalendar',
        components: {
            Calendar,
        },
        props: {
            events: {
                type: Array,
                default: () => ([])
            }
        },
        computed: {
            items() {
                return this.events.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.startDate,
                    end: event.endDate,
                    url: event.url,
                    allday: true
                }))
            }
        }
    };
</script>

<style scoped>

</style>
