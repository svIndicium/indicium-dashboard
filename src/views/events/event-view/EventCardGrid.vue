<template>
    <div class="card-container">
        <EventTile :event="event" v-for="(event, idx) in lastTenEvents" :key="idx" @click="() => onClick(event)" class="clickable"></EventTile>
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
        },
        computed: {
            lastTenEvents() {
                return this.events.slice().reverse().slice(0, 10);
            }
        }
    };
</script>

<style lang="scss" scoped>
.card-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    * {
        width: 50%;
    }
}
</style>
