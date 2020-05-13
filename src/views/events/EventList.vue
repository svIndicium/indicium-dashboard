<template>
    <div>
        <div class="table-container">
            <div class="header">Activiteit</div>
            <div class="header">Datum</div>
            <div class="header">Tijd</div>
            <template v-for="(event, idx) in events">
                <div v-bind:key="'name' + idx" class="cell">{{event.title}}</div>
                <div v-bind:key="'date' + idx" class="cell">{{$utils.getDayAsString(new Date(event.startDate).getUTCDay())}} {{$utils.getPrettyDate(event.startDate)}}</div>
                <div v-bind:key="'time' + idx" class="cell">{{new Date(event.startDate).getUTCHours()}}:{{new Date(event.startDate).getUTCMinutes()}}</div>
            </template>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'EventList',
        props: {
            events: {
                type: Array,
                default: () => ([]),
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/table";
    @import "src/assets/scss/error";
    .table-container {
        @extend .table-container;
        margin-top: 16px;
        grid-template-columns: 2fr 1.5fr 1fr;
    }

</style>
