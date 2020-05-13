<template>
    <div class="text-input">
        <label>{{ label }}<span class="required">{{ required ? ' * ' : '' }}</span><br v-if="extra" /><span class="extra">{{ extra }}</span></label>
        <br />
        <select v-model="internalValue" :class="[!!error ? 'error' : '']" @change="update">
            <option v-if="zeroItem" disabled :value="zeroItem.value" selected hidden>
                {{ zeroItem.key }}
            </option>
            <option v-for="(item, idx) in items" :key="idx" :value="item.value">
                {{ item.key }}
            </option>
        </select>
        <div class="error-message">
            {{ error }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SelectBox',
        props: {
            value: {
                default: 0,
            },
            label: {
                type: String,
                default: '',
            },
            extra: {
                type: String,
                default: null,
            },
            error: {
                type: String,
                default: '',
            },
            required: {
                type: Boolean,
                default: false,
            },
            items: {
                type: Array,
                default: () => ([]),
            },
            zeroItem: {
                type: Object,
                default: () => ({}),
            }
        },
        data() {
            return {
                internalValue: this.value,
            }
        },
        methods: {
            update() {
                this.$emit('input', this.internalValue)
            },
        },
    }
</script>

<style lang="scss" scoped>

    .text-input {
        margin-bottom: 8px;
    }

    .extra {
        font-size: 12px;
    }

    .required {
        color: red;
    }

    select {
        border: 2px var(--indi-grey) solid;
        padding: 8px 16px;
        border-radius: 8px;
        color: var(--text-color);
        transition: .3s;
        height: auto;
        width: 205px;
        font-size: 13px;
        font-family: var(--header-font);
        &::placeholder {
            color: var(--text-color);
        }

        &:focus {
            border: 2px var(--indi-blue-1) solid;
            outline: none;
            &::placeholder {
                transition: .3s;
                color: transparent;
            }
        }

        &.error {
            border: 2px var(--indi-error) solid;
        }
    }

    .error-message {
        margin-left: 16px;
        color: var(--indi-error);
        font-size: 12px;
    }

</style>
