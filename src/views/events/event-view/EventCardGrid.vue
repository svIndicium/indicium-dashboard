<template>
    <div>
        <EventTile :event="event" v-for="(event, idx) in events" :key="idx" @click="() => onClick(event)" class="clickable"></EventTile>
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
        },
        methods: {
            onClick(event) {
                this.$emit('eventSelected', event);
            }
        }
    };
</script>

<style scoped>

</style>
