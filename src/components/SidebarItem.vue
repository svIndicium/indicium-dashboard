<template>
    <router-link v-if="!!url" :to="url" :class="['link', collapsed ? 'collapsed' : '']">
        <div v-if="!!icon">
            <Icon :type="icon" />
            <transition name="fade">
                <span v-if="!collapsed">{{title}}</span>
            </transition>
        </div>
        <div v-else>
            <img v-bind:src="this.imgUrl" class="avatar" alt="Gebruikersafbeelding">
            <transition name="fade">
                <span v-if="!collapsed">{{title}}</span>
            </transition>
        </div>
    </router-link>
    <div v-else @click="callback" :class="['link', collapsed ? 'collapsed' : '']">
        <div v-if="!!icon">
            <Icon :type="icon" />
            <transition name="fade">
                <span v-if="!collapsed">{{title}}</span>
            </transition>
        </div>
        <div v-else>
            <img v-bind:src="this.imgUrl" class="avatar" alt="Gebruikersafbeelding">
            <transition name="fade">
                <span v-if="!collapsed">{{title}}</span>
            </transition>
        </div>
    </div>
</template>

<script>
    import Icon from './Icon';
    export default {
        name: 'SidebarItem',
        components: { Icon },
        props: {
            title: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: false
            },
            icon: {
                type: String,
                required: false
            },
            imgUrl: {
                type: String,
                required: false
            },
            callback: {
                type: Function,
                required: false
            },
            collapsed: {
                type: Boolean,
                required: false
            }
        }
    };
</script>

<style lang="scss" scoped>
    .link {
        margin: 8px 24px 0 0;
        height: 64px;
        color: white;
        border-radius: 8px;
        vertical-align: center;
        transition: 0.3s;

        div {
            display: flex;
            align-items: center;
            height: 100%;
            span.ti, img {
                margin-left: 8px;
                margin-right: 16px;
                transition: 0.3s;
            }
            span.ti {
                font-size: 28px;
                padding: 0 4px;
            }
            img {
                width: 36px;
                clip-path: circle(50%);
            }
        }

        &.collapsed {
            div {
                span.ti, img {
                    margin-right: 0;
                    transition: 0.3s;
                }
            }
        }

        &:hover {
            background-color: #97D5E5;
            color: white;
            transition: 0.3s;
            cursor: pointer;
        }
    }

    .router-link-active {
        background-color: var(--inner-sidebar-background);
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
            box-shadow: 0 -6px 0 0 var(--inner-sidebar-background);
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
            box-shadow: 0 6px 0 0 var(--inner-sidebar-background);
            transition: 0.3s;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
