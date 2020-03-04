<template>
    <button v-if="disabled" :class="['btn', 'disabled', size, center ? 'center' : '']">
        <slot></slot>
    </button>
    <button v-else-if="callback" @click="callback" :class="['btn', size, center ? 'center' : '']">
        <slot></slot>
    </button>
    <a v-else-if="url.startsWith('http')" :href="url" :class="['btn', size, center ? 'center' : '']">
        <slot></slot>
    </a>
    <router-link v-else :to="url" :class="['btn', size, center ? 'center' : '']">
        <slot></slot>
    </router-link>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            size: {
                type: String,
                required: false,
                default: 'm',
            },
            center: {
                type: Boolean,
                default: false,
            },
            url: {
                type: String,
                default: '#',
            },
            callback: {
                type: Function,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            getButtonClass() {
                return ['btn', this.size, this.center ? 'center' : '', this.disabled ? 'disabled' : ''];
            },
        },
    };
</script>

<style lang="scss" scoped>
    .btn {
        color: #fff;
        background: #72c9e0;
        box-shadow: 0 0 32px rgba(181, 187, 201, 0.4);
        border-radius: 4px;
        border: 0;
        transition: 200ms;
        display: inline-flex;
        cursor: pointer;

        &.s {
            padding: 8px;
            font-size: .6rem;
        }

        &.m {
            padding: 8px 12px;
            font-size: .8rem;
        }

        &.l {
            padding: 12px 24px;
            font-size: 1rem;
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
</style>
