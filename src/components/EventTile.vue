<template>
    <a :class="['event-tile', 'container', eventState]" :href="event.url">
        <h5>{{ toDateString }}</h5>
        <h4>{{ event.title }}</h4>
        <p class="small">{{ getDescription }}</p>
    </a>
</template>

<script>
    export default {
        name: 'EventTile',
        props: {
            event: {
                type: Object,
                required: true,
            },
        },
        computed: {
            toDateString() {
                return `${this.$utils.getDayAsString(new Date(this.event.startDate).getUTCDay())} ${this.$utils.getPrettyDate(this.event.startDate)}`
            },
            getDescription() {
                const text = this.event.description.slice(0, 140).trim()
                if (this.event.description.length > 140) {
                    return `${text}...`
                }
                return text
            },
            eventState() {
                const now = new Date();
                const startDate = new Date(this.event.startDate);
                const endDate = new Date(this.event.endDate);
                if (startDate.getTime() > now.getTime()) {
                    return 'planned';
                } else if (endDate.getTime() > now.getTime() && startDate.getTime() < now.getTime()) {
                    return 'active';
                } else {
                    return 'ended';
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .event-tile {
        display: inline-flex;
        position: relative;
        min-width: 300px;
        flex: 1;
        flex-direction: column;
        margin: 32px 16px 16px;
        background: var(--inner-sidebar-background);
        padding: 16px;
        box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.2);
        transition: box-shadow 300ms;

        &:hover {
            box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.3);
        }

        &.ended {
            box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.1);

            h5 {
                color: var(--text-color);
                margin: 0 0 8px 0;
            }

            &:hover {
                box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.2);
            }
        }

        &.active {
            box-shadow: 0 0 20px 0 var(--indi-blue-2);

            &:hover {
                box-shadow: 0 0 20px 0 var(--indi-blue-1);
            }

        }

        h5 {
            color: #72c9e0;
            margin: 0 0 8px 0;
        }

        h4 {
            color: var(--text-color);
            margin: 0;
        }

        p {
            color: var(--text-color);
            margin: 0;
            text-overflow: ellipsis;
        }
    }
</style>
