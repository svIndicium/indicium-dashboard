<template>
  <div class="center">
    <div v-if="$auth.loading">
      <Loading></Loading>
    </div>

    <div v-else>
        <p>Officall Indicium society dashboard for all things!! It's a GODDD.</p>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue';
import Button from '../components/button.vue';

export default {
  components: {
    Loading,
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
