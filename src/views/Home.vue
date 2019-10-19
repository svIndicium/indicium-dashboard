<template>
  <div class="center">
    <div v-if="$auth.loading">
      <Loading></Loading>
    </div>
    <div v-else>
      <h3>Ledenadministratie</h3>
      <Button url="/users">Ga</Button>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue';
import Button from '../components/button.vue';

export default {
  components: {
    Button,
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
  data() {
    return {
      token: '',
    };
  },
  created() {
    this.$auth.getTokenSilently()
      .then((t) => {
        this.token = t;
      });
  },
};
</script>
