<template>
    <div>
        <EventTile :event="event" v-for="(event, idx) in events" :key="idx"></EventTile>
    </div>
</template>

<script>
    import EventTile from '../../../components/EventTile';

    export default {
        name: 'EventCardGrid',
        props: {
            events: {
                type: Array,
                default: () => ([]),
            }
        },
        components: {
            EventTile,
        }
    };
</script>

<style scoped>

</style>
