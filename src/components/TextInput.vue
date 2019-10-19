<template>
  <div>
    <input type="text" v-model="internalValue" @input="update" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: ['value', 'placeholder', 'label'],
  data() {
    return {
      internalValue: this.value,
    };
  },
  methods: {
    update() {
      this.$emit('input', this.internalValue);
    },
  },
};
</script>

<style scoped>
input {
  border: 1px #CCCCCC solid;
  padding: 4px;
  border-radius: 5px;
  margin: 4px;
}
</style>
