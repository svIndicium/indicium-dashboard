<template>
  <div>
    <NavToggle></NavToggle>
    <NavBar></NavBar>
    <breadcrumbs></breadcrumbs>
    <slot></slot>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import Breadcrumbs from '../components/Breadcrumbs';
import NavToggle from '../components/NavToggle';

export default {
  name: 'Layout',
  components: { NavToggle, Breadcrumbs, NavBar },
};
</script>

<style lang="scss" scoped>

</style>
