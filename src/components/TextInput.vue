<template>
    <div>
        <input type="text" v-model="internalValue" @input="update" :placeholder="placeholder" :class="[!!error ? 'error' : '']">
        <div class="error-message">{{error}}</div>
    </div>
</template>

<script>
    export default {
        name: 'TextInput',
        props: ['value', 'placeholder', 'label', 'error'],
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
    input {
        border: 2px var(--indi-grey) solid;
        padding: 8px 16px;
        border-radius: 8px;

        &:focus {
            border: 2px var(--indi-blue) solid;
            outline: none;
        }

        &.error {
            border: 2px #E07272 solid;
        }
    }

    .error-message {
        margin-left: 16px;
        color: #E07272;
        font-size: 12px;
    }
</style>
