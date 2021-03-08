<template>
    <Calendar :items="items" @eventClick="onClick" />
</template>

<script>
    import Calendar from '../../../components/Calendar';

    export default {
        name: 'EventCalendar',
        components: {
            Calendar,
        },
        methods: {
            onClick(args) {
                this.$emit('eventSelected', {id: args.event.id, title: args.event.title});
            }
        },
        computed: {
            items() {
                return this.$store.state.events.events.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.startDate,
                    end: event.endDate,
                    allday: true
                }))
            }
        }
    };
</script>

<style scoped>

</style>
