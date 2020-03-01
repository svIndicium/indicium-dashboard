<template>
    <div>
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
        <Button size="m" :callback="approveRegistration">Stem lid in</Button>
        <Button size="m" :callback="denyRegistration">Stem lid weg</Button>
        <Button size="m" url="/leden">Terug</Button>
    </div>
</template>

<script>
    import Button from '../../components/button.vue';
    export default {
        name: 'ViewRegistration',
        components: { Button },
        props: ['registrationId'],
        data: () => ({
            registration: null
        }),
        methods: {
            async getRegistration() {
                const { data } = await this.$api.get(`/registration/${this.registrationId}`);
                this.registration = data;
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
                const { data } = await this.$api.post(`/registration/${this.registrationId}`, {approved: true});
                this.registration = data;
            },
            async denyRegistration() {
                const { data } = await this.$api.post(`/registration/${this.registrationId}`, {approved: false, comment: 'troll'});
                this.registration = data;
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
            fullName() {
                if (this.registration.middleName) {
                    return `${this.registration.firstName} ${this.registration.middleName} ${this.registration.lastName}`;
                }
                return `${this.registration.firstName} ${this.registration.lastName}`;
            }
        }
    };
</script>

<style scoped>

</style>
