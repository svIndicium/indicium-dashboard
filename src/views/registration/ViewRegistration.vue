<template>
    <div>
        <div v-if="!!this.registration">
            <h4>{{fullName}}</h4>
            <h5>E-mailadres</h5>
            <a :href="mailtoLink">{{this.registration.email}}</a>
            <h5>Telefoonnummer</h5>
            <p>{{this.registration.phoneNumber}}</p>
            <h5>Geboortedatum</h5>
            <p>{{dateOfBirth}}</p>
            <h5>Afstudeerrichting</h5>
            <p>{{this.registration.studyType.name}}</p>
            <h5>Ontvangt nieuwsbrief?</h5>
            <p>{{this.registration.toReceiveNewsletter ? 'Ja' : 'Nee'}}</p>
            <h5>Aangemeld op</h5>
            <p>{{dateOfRegistration}}</p>
            <h5>Laatst bijgewerkt op</h5>
            <p>{{dateOfLastUpdate}}</p>
            <div v-if="finalized">
                <h5>Beoordeeld op</h5>
                <p>{{dateOfFinalization}}</p>
                <h5>Beoordeeld door</h5>
                <p>{{this.registration.finalizedBy}}</p>
                <div v-if="!this.registration.approved">
                    <h5>Reden van afwijzing</h5>
                    <p>{{this.registration.comment}}</p>
                </div>
            </div>
            <TextInput placeholder="Reden van afwijzing" v-model="reason" v-if="!finalized"></TextInput>
            <Button size="m" url="/leden">Terug</Button>
            <Button size="m" :callback="approveRegistration" v-if="!finalized">Stem lid in</Button>
            <Button size="m" :callback="denyRegistration" v-if="!finalized">Stem lid weg</Button>
        </div>
    </div>
</template>

<script>
    import Button from '../../components/button.vue';
    import TextInput from '../../components/TextInput';
    export default {
        name: 'ViewRegistration',
        components: { TextInput, Button },
        props: ['registrationId'],
        data: () => ({
            registration: null,
            reason: '',
            loading: true
        }),
        methods: {
            async getRegistration() {
                const { data } = await this.$api.get(`/registration/${this.registrationId}`);
                this.registration = data;
                this.loading = false;
            },
            getMonthAsString(currentMonth) {
                const monthList = [
                    'januari',
                    'februari',
                    'maart',
                    'april',
                    'mei',
                    'juni',
                    'juli',
                    'augustus',
                    'september',
                    'oktober',
                    'november',
                    'december',
                ];

                return monthList[currentMonth];
            },
            convertDateStringToDate(dateString) {
                const date = new Date(dateString);
                return `${date.getDate()} ${this.getMonthAsString(date.getMonth())} ${date.getFullYear()}`;
            },
            async approveRegistration() {
                this.loading = true;
                const { data } = await this.$api.post(`/registration/${this.registrationId}/finalize`, {approved: true});
                this.registration = data;
                this.loading = false;
            },
            async denyRegistration() {
                this.loading = true;
                const { data } = await this.$api.post(`/registration/${this.registrationId}/finalize`, {approved: false, comment: this.reason});
                this.registration = data;
                this.loading = false;
            }
        },
        async created() {
            await this.getRegistration();
        },
        computed: {
            mailtoLink() {
                return `mailto:${this.registration.email}`;
            },
            dateOfBirth() {
                return this.convertDateStringToDate(this.registration.dateOfBirth)
            },
            dateOfRegistration() {
                return this.convertDateStringToDate(this.registration.created)
            },
            dateOfLastUpdate() {
                return this.convertDateStringToDate(this.registration.updated)
            },
            dateOfFinalization() {
                return this.convertDateStringToDate(this.registration.finalizedAt)
            },
            finalized() {
                return !!this.registration.finalizedAt;
            },
            fullName() {
                if (this.registration.middleName) {
                    return `${this.registration.firstName} ${this.registration.middleName} ${this.registration.lastName}`;
                }
                return `${this.registration.firstName} ${this.registration.lastName}`;
            }
        }
    };
</script>

<style lang="scss" scoped>
p, a {
    font-weight: bold;
}

h5 {
    margin-top: 4px;
    font-weight: normal;
}

    Button {
        margin-left: 8px;
    }
</style>
