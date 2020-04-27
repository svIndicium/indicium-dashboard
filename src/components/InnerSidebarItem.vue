<template>
    <router-link :to="{name: routeName, params: params}" :class="['link', child ? 'child': '']">
        <span>{{title}}</span>
    </router-link>
</template>

<script>
    export default {
        name: 'InnerSidebarItem',
        props: {
            title: {
                type: String,
                required: true
            },
            routeName: {
                type: String,
                required: true
            },
            params: {
                type: Object,
                required: false,
            },
            child: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    };
</script>

<style lang="scss" scoped>

    .link {
        margin: 8px 24px 0 0;
        padding: 0 0 0 16px;
        background-color: var(--indi-grey);
        height: 32px;
        line-height: 32px;
        color: var(--text-color);
        border-radius: 8px;
        vertical-align: center;
        transition: 0.3s;



        &:hover {
            background-color: #97D5E5;
            transition: 0.3s;
            cursor: pointer;
            color: white;
        }
    }

    .child {
        margin-left: 16px;
    }


    .router-link-exact-active {
        background-color: var(--indi-blue-light);
        color: var(--text-color);
        margin-right: 0;
        position: relative;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;

        &:hover {
            &:before {
                box-shadow: 0 -6px 0 0 #97D5E5;
                transition: 0.3s;
            }
            &:after {
                box-shadow: 0 6px 0 0 #97D5E5;
                transition: 0.3s;
            }
        }

        &:before {
            background: transparent;
            position: absolute;
            display: block;
            content: '';
            height: 11px;
            width: 8px;
            right: 0;
            top: 100%;
            border-top-right-radius: 8px;
            box-shadow: 0 -6px 0 0 var(--indi-blue-light);
            transition: 0.3s;
        }

        &:after {
            background: transparent;
            position: absolute;
            display: block;
            content: '';
            height: 11px;
            width: 8px;
            right: 0;
            bottom: 100%;
            border-bottom-right-radius: 8px;
            box-shadow: 0 6px 0 0 var(--indi-blue-light);
            transition: 0.3s;
        }
    }
</style>
