<template>
    <select v-model="internalValue" @change="update">
      <option selected disabled>{{ label ? label : '' }}</option>
      <option v-for="(item, idx) in items" :key="idx" :value="item[valueAttribute]">
        {{ item[displayAttribute] }}
      </option>
    </select>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    value: {
      type: String,
    },
    firstEmpty: {
      type: Boolean,
    },
    items: {
      type: Array,
    },
    displayAttribute: {
      type: String,
    },
    valueAttribute: {
      type: String,
    },
    label: {
      type: String,
    },
  },
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

<style lang="scss" scoped>
</style>
