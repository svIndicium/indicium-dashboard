<template>
    <span :class="['ti', `ti-${type}`]"></span>
</template>

<script>
  export default {
    name: 'Icon',
      props: {
          type: {
              type: String,
              required: true
          },
      }
  };
</script>

<style lang="scss" scoped>
    @import "~tabler-icons/iconfont/tabler-icons.css";
</style>
