<template>
    <div>
        <h2>Nieuwe activiteit</h2>
        <TextInput label="Naam" placeholder="Naam" v-model="event.title" required></TextInput>
        <TextInput label="Beschrijving" placeholder="Beschrijving" v-model="event.description" required></TextInput>
        <TextInput label="Link naar inschrijfformulier" placeholder="Url" v-model="event.url"></TextInput>
        <TextInput label="Titel in de link" placeholder="slug" v-model="event.slug" required></TextInput>
        <SelectInput label="Status" :items="status" display-attribute="key" value-attribute="value" v-model="event.status"></SelectInput>
        <DateTimeInput label="Begin datum" placeholder="Begin datum" v-model="event.startDate" class="date-time-picker" required></DateTimeInput>
        <DateTimeInput label="Eind datum" placeholder="Eind datum" v-model="event.endDate" class="date-time-picker" required></DateTimeInput>
        <br>
        <Button :callback="createEvent" size="l" class="submit">Maak aan</Button>
    </div>
</template>

<script>
    import TextInput from '../../components/TextInput';
    import SelectInput from '../../components/SelectInput';
    import DateInput from '../../components/DateInput';
    import Button from '../../components/button';
    import DateTimeInput from '../../components/DateTimeInput';
    export default {
        name: 'CreateEvent',
        components: { DateTimeInput, Button, SelectInput, TextInput },
        data: () => ({
            loading: false,
            error: null,
            data: '',
            event: {
                title: '',
                description: '',
                url: '',
                slug: '',
                status: 'DRAFT',
                startDate: new Date(),
                endDate: new Date(),
            },
            status: [
                {
                    "key": "Klad",
                    "value": "DRAFT"
                },
                {
                    "key": "Gepubliceerd",
                    "value": "PUBLISHED"
                },
                {
                    "key": "Privé",
                    "value": "PRIVATE"
                },
            ]
        }),
        methods: {
            async createEvent() {
                this.loading = true;
                try {
                    const { status } = await this.$api.post('/events', this.event);
                    if (status === 201) {
                        await this.$router.push({name: 'EventDashboard'});
                    }
                } catch (e) {
                    this.error = e;
                }
                this.loading = false;
            }
        }
    };
</script>

<style lang="scss" scoped>

    .date-time-picker {
        padding: 0 16px;
    }

    .submit {
        margin-top: 16px;
    }
</style>
