<template>
  <nav :class="['nav', { 'open': isNavShown }]">
    <div class="close" @click="$eventBus.$emit('nav-toggle', false)">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8d8f91"
           stroke-width="3" stroke-linecap="square" stroke-linejoin="arcs">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>

    <div class="container flex">
      <div v-show="!isMobile" class="logo">
        <router-link to="/">
          <img src="/indicium-logo-left.svg" alt="Indicium Logo" />
        </router-link>
      </div>

      <ul :style="{ margin: '0'}">
        <li v-show="isMobile">
          <router-link to="/" @click.native="hideNav" prefetch>Home</router-link>
        </li>
        <li v-for="item in items" :key="item.title + item.url">
          <a v-if="item.url.startsWith('http')" @click="hideNav" :href="item.url" target="_blank">{{ item.title }}</a>
          <router-link v-else :to="{name: item.url}" @click.native="hideNav" prefetch>{{ item.title }}</router-link>
        </li>
        <li v-if="this.$auth.isAuthenticated">
          <a @click="logout">
            Log uit
          </a>
        </li>
        <li v-else>
          <a @click="login">
            Log in
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isMobile() {
      return process.browser
        ? window.innerWidth < 700
        : false;
    },
  },
  mounted() {
    this.$set(this, 'isNavShown', !this.isMobile);

    this.$eventBus.$on('nav-toggle', (payload) => {
      this.$set(this, 'isNavShown', payload);
    });
  },
  methods: {
    hideNav() {
      console.log('hide nav g', this.isMobile);
      if (this.isMobile) {
        this.$eventBus.$emit('nav-toggle', false);
      }
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
    login() {
      this.$auth.loginWithRedirect();
    },
  },
  data: () => ({
    isNavShown: true,
    items: [
      {
        title: 'Leden',
        url: 'listUser',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .nav {
    display: block;
    z-index: 1000;
    background: rgba(255,255,255, .9);
    box-shadow: inset 0 -2px 0 0 #cecfcf;
    position: fixed;
    top:0;
    left:0;
    width: 100%;

    .logo {
      img {
        max-width: 204px;
      }
    }

    ul {
      list-style: none;
      display: flex;
      max-width: 984px;
      // margin: 0 auto;
      justify-content: space-between;
      align-items: center;
      overflow: auto;

      li {
        a {
          display: block;
          padding: 24px;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-color);
          text-align: center;
          text-decoration: none;
          cursor: pointer;
        }
      }
    }

    .close {
      display: none;
    }

    // mobile nav
    @media screen and (max-width: $bp-tablet-sm) {
      opacity: 1;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(255,255,255, .95);
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 100ms linear;

      transform: translateX(-100%);

      &.open {
        transform: translateX(00%);
      }

      ul {
        flex-direction: column;
      }

      .container {
        flex-direction: column;
      }

      .close {
        display: block;
        position: absolute;
        top: 24px;
        right: 24px;
      }
    }
  }
</style>
