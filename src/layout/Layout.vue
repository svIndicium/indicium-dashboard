<template>
  <div>
    <NavBar></NavBar>
    <breadcrumbs></breadcrumbs>
    <slot></slot>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import Breadcrumbs from '../components/Breadcrumbs';

export default {
  name: 'Layout',
  components: { Breadcrumbs, NavBar },
};
</script>

<style lang="scss" scoped>

</style>
