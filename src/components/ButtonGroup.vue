<template>
    <div class="btn-group">
        <div v-for="(button, idx) in buttons" @click="button.callback" class="btn l" :key="idx">
            <icon v-if="button.icon" :type="button.icon" class="icon" />
            {{button.label}}
        </div>
    </div>
</template>

<script>
    import Icon from './Icon';
    export default {
        name: 'ButtonGroup',
        components: { Icon },
        props: {
            buttons: {
                type: Array,
                default: () => ([])
            }
        },
    };
</script>

<style lang="scss" scoped>
    .btn-group {
        display: flex;

        .btn {
            color: #fff;
            background: var(--indi-blue-1);
            box-shadow: 0 0 32px rgba(181, 187, 201, 0.4);
            border: 0;
            transition: 200ms;
            cursor: pointer;
            border-right: 1px solid var(--indi-grey);

            &:first-child {
                border-radius: 8px 0 0 8px;
            }

            &:last-child {
                border-radius: 0 8px 8px 0;
                border-right: none;
            }

            &.s {
                padding: 8px;
                font-size: .6rem;
                height: 1rem;
                width: calc(3rem + 8px);
            }

            &.m {
                padding: 8px 12px;
                font-size: .8rem;
                height: 2rem;
                width: calc(3rem + 12px);
            }

            &.l {
                padding: 8px 18px;
                font-size: 1.6rem;
                height: 3rem;
                width: calc(3rem + 18px);
            }

            &.center {
                margin-left: auto;
                margin-right: auto;
            }

            &:hover {
                -webkit-box-shadow: 0 0 32px rgba(181, 187, 201, 0.8);
                -moz-box-shadow: 0 0 32px rgba(181, 187, 201, 0.8);
                box-shadow: 0 0 32px rgba(181, 187, 201, 0.8);
            }

            &.disabled {
                background-color: #CCCCCC;
                box-shadow: none;
                cursor: default;
                &:hover {
                    box-shadow: none;
                }
            }
        }
    }
</style>
