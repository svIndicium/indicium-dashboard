<template>
  <Layout>
    <RouterView></RouterView>
  </Layout>
</template>

<script>
import Layout from './layout/Layout.vue';

export default {
  name: 'App',
  components: { Layout },
  data: () => ({
  }),
};
</script>

<style lang="scss">
  @import "assets/scss/main";
</style>
