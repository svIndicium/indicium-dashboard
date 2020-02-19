<template>
    <div class="sidebar">
        <div class="logo">
            <img src="/indicium-logo-left.svg" alt="Indicium">
        </div>

        <div class="menu-items">
            <ul>
                <li>
                    <router-link to="/activiteiten">Activiteiten</router-link>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/activiteiten/create">Creeer</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link to="/leden">Leden</router-link>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/leden/create">Creeer</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link to="/studytypes">Studie richtingen</router-link>
                    <ul class="sub-menu">
                        <li>
                            <router-link to="/studytypes/create">Creeer</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="bottom-bar">
            <a href="https://noudadrichem.com">&copy; noudadrichem</a>
        </div>

        <AnimatedLine :bottom="0" left="-150px" :rotate="180" :interval="4000" :doHideMobile="true" />
        <AnimatedLine bottom="48px" left="-170px" :rotate="180" :interval="5000" :doHideMobile="true" />
        <AnimatedLine bottom="94px" left="-190px" :rotate="180" :interval="6000" :doHideMobile="true" />
    </div>
</template>

<script>
import AnimatedLine from '../components/AnimatedLine'

export default {
    components: {
        AnimatedLine
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    width: var(--sidebar-width);
    height: 100vh;
    box-shadow: inset -1px 0 0 #c6d1e0;
    padding: 48px 24px 0 24px;
    display: flex;
    flex-direction: column;

    position: fixed;
    left: 0;
    top: 0;

    .router-link-active {
        color: var(--indi-blue);
        position: relative;

        &:before {
            content: '';
            display: block;
            position: absolute;
            top:0;
            left: -8px;
            width: 3px;
            border-radius: 4px;
            height: 100%;
            background: var(--indi-blue);
        }
    }

    .logo {
        max-width: 200px;
    }

    .menu-items {
        flex: 1;
        margin-top: 24px;
    }

    .sub-menu {
        padding-left: 12px;
    }
}
</style>
