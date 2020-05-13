<template>
    <div class="picker">
        <label>{{ label }}<span class="required">{{ required ? ' *' : '' }}</span></label>
        <VueCtkDateTimePicker v-model="internalValue" inline format="YYYY-MM-DDThh:mma" :first-day-of-week="1" :no-keyboard="true" @input="update"></VueCtkDateTimePicker>
    </div>
</template>

<script>
    export default {
        name: 'DateTimeInput',
        props: {
            value: {
                type: Date,
                default: () => {},
            },
            label: {
                type: String,
                default: '',
            },
            error: {
                type: String,
                default: '',
            },
            required: {
                type: Boolean,
                default: false,
            }
        },
        data: () => ({
            internalValue: '',
        }),
        methods: {
            stringToDate(dateString) {
                const date = new Date(dateString.slice(0, 4), parseInt(dateString.slice(5,7)) - 1, dateString.slice(8,10), dateString.slice(11,13), dateString.slice(14,16))
                if (dateString.search('pm') !== -1) {
                    date.setTime(date.getTime() + 12 * 60 * 60 * 1000);
                }
                let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
                let minutesDiff = (date.getMinutes() - date.getTimezoneOffset()) % 60;
                date.setHours(hoursDiff);
                date.setMinutes(minutesDiff);
                return date;
            },
            dateToString(date) {
                return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}T${date.getHours() % 12}:${date.getUTCMinutes()}${date.getUTCHours() - 12 >= 0 ? 'pm' : 'am'}`;
            },
            update() {
                this.$emit('input', this.stringToDate(this.internalValue));
            },
        },
        created() {
            this.internalValue = this.dateToString(this.value)
        }
    };
</script>

<style lang="scss" scoped>
    @import "~vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

    .picker {
        width: 500px;
        display: inline-block;
    }

    .required {
        color: red;
    }
</style>
