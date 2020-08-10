<template>
    <div :class="['status', status]"><slot></slot></div>
</template>

<script>
    export default {
        name: 'StatusLabel',
        props: {
            status: {
                type: String,
                required: false,
                default: 'normal'
            }
        }
    };
</script>

<style lang="scss" scoped>
    .status {
        display: inline;
        padding: 4px 8px;
        font-size: 14px;
        background-color: var(--indi-blue-2);
        color: var(--text-color);
        line-height: normal;
        border-radius: 8px;
       white-space: nowrap;

        &.success {
            background-color: var(--indi-success);
            color: var(--inner-sidebar-background);
        }

        &.warning {
            background-color: var(--indi-warning);
            color: var(--inner-sidebar-background);
        }

        &.error {
            background-color: var(--indi-error);
            color: var(--inner-sidebar-background);
        }
    }
</style>
