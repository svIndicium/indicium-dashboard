<template>
    <div>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <h2>{{fullName}}</h2>
            <StatusLabel status="error" v-if="registration.reviewStatus === 'PENDING'">Wachtend op mailverificatie</StatusLabel>
            <StatusLabel status="success" v-else-if="registration.reviewStatus === 'APPROVED'">Ingestemd</StatusLabel>
            <StatusLabel status="error" v-else-if="registration.reviewStatus === 'DENIED'">Weggestemd</StatusLabel>
            <StatusLabel status="error" v-else>Onbekend</StatusLabel>
            <div class="action-buttons">
                <Button size="l" :url="whatsAppLink" class="contact-button"><Icon type="message" class="buttonicon" />Stuur Whatsapp bericht</Button>
                <Button size="l" :url="mailtoLink" class="contact-button"><Icon type="mail" class="buttonicon" />Stuur email</Button>
            </div>
            <div class="section">
                <h3 class="section-header">Contact informatie</h3>
                <div class="section-entry">
                    <p class="key">Telefoonnummer</p>
                    <p class="value">{{this.$utils.getPrettyPhoneNumber(this.registration.memberDetails.phoneNumber)}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Emailadres</p>
                    <p class="value">{{registration.mailAddress}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Wilt nieuwsbrief ontvangen</p>
                    <p class="value">{{registration.receivingNewsletter ? 'Ja' : 'Nee'}}</p>
                </div>
            </div>
            <div class="section">
                <h3 class="section-header">Persoonlijke informatie</h3>
                <div class="section-entry">
                    <p class="key">Geboortedatum</p>
                    <p class="value">{{dateOfBirth}}</p>
                </div>
                <div class="section-entry" v-if="!!registration.studyType">
                    <p class="key">Studierichting</p>
                    <p class="value">{{this.registration.studyType.name}}</p>
                </div>
            </div>
            <div class="section">
                <h3 class="section-header">Aanmeldings informatie</h3>
                <div class="section-entry">
                    <p class="key">Datum van aamelding</p>
                    <p class="value">{{this.$utils.getPrettyDateTime(this.registration.memberDetails.createdAt)}}</p>
                </div>
                <div class="section-entry" v-if="finalized">
                    <p class="key">Beoordeeld op</p>
                    <p class="value">{{this.$utils.getPrettyDateTime(this.registration.reviewDetails.reviewedAt)}}</p>
                </div>
                <div class="section-entry" v-if="finalized">
                    <p class="key">Beoordeeld door</p>
                    <p class="value">{{this.registration.reviewDetails.reviewedBy}}</p>
                </div>
                <div class="section-entry" v-if="!!this.registration.reviewDetails && !!this.registration.reviewDetails.comment">
                    <p class="key">Reden</p>
                    <p class="value">{{this.registration.reviewDetails.comment}}</p>
                </div>
            </div>
            <TextInput placeholder="Opmerking" v-model="reason" v-if="!finalized" class="reason" :error="fieldError.message"></TextInput>
            <Button size="m" :callback="approveRegistration" v-if="!finalized" class="finalbutton button"><Icon type="user-check" class="buttonicon" />Stem in</Button>
            <Button size="m" :callback="denyRegistration" v-if="!finalized" class="finalbutton button"><Icon type="user-x" class="buttonicon" />Stem weg</Button>
        </div>
        <div v-else>
            <div class="errorcontainer">
                <Icon type="alert-circle" class="icon" />
                <span class="message">
                    {{ errorMessage }}
                </span>
            </div>
            <Button :callback="getRegistration" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Button from '../../../components/button.vue';
    import TextInput from '../../../components/TextInput';
    import Loading from '@svindicium/indicium-components';
    import Icon from '../../../components/Icon';
    import StatusLabel from '../../../components/StatusLabel';

    export default {
        name: 'ViewRegistration',
        components: { StatusLabel, TextInput, Button, Loading, Icon },
        data: () => ({
            registration: {},
            reason: '',
            loading: false,
            error: null,
            fieldError: {},
        }),
        methods: {
            async getRegistration() {
                this.error = null;
                try {
                    const registrationId = this.$route.params.registrationId;
                    const { data } = await this.$api.get(`/registrations/${registrationId}`);
                    this.registration = data;
                    await this.getStudyType();
                } catch (e) {
                    this.error = e;
                }
            },
            async getStudyType() {
                const { data } = await this.$api.get(`/studytypes/${this.registration.memberDetails.studyTypeId}`);
                this.registration.studyType = data;
            },
            async approveRegistration() {
                this.loading = true;
                try {
                    const registrationId = this.$route.params.registrationId;
                    const { data } = await this.$api.post(`/registrations/${registrationId}/review`, {reviewStatus: "APPROVED"});
                    this.registration = data;
                } catch (e) {
                    this.fieldError = e.response.data;
                }
                this.loading = false;
            },
            async denyRegistration() {
                this.loading = true;
                try {
                    const registrationId = this.$route.params.registrationId;
                    const { data } = await this.$api.post(`/registrations/${registrationId}/review`, {reviewStatus: "DENIED", comment: this.reason});
                    this.registration = data;
                } catch (e) {
                    this.fieldError = e.response.data;
                }
                this.loading = false;
            }
        },
        async created() {
            this.loading = true;
            await this.getRegistration();
            this.loading = false;
        },
        computed: {
            mailtoLink() {
                return `mailto:${this.registration.mailAddress}`;
            },
            dateOfBirth() {
                return this.$utils.getPrettyDate(this.registration.memberDetails.dateOfBirth)
            },
            whatsAppLink() {
                if (this.registration.phoneNumber === undefined) return "";
                return `https://wa.me/${this.registration.phoneNumber.replace("+", "")}`;
            },
            fullName() {
                if (this.registration.memberDetails.name.middleName) {
                    return `${this.registration.memberDetails.name.firstName} ${this.registration.memberDetails.name.middleName} ${this.registration.memberDetails.name.lastName}`;
                }
                return `${this.registration.memberDetails.name.firstName} ${this.registration.memberDetails.name.lastName}`;
            },
            finalized() {
                return this.registration.reviewStatus !== "PENDING";
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/profile";
    @import "src/assets/scss/error";
    .reason {
        margin-top: 16px;
        margin-bottom: 8px;
    }

    .finalbutton {
        margin-right: 8px;
    }

    .contact-button {
        margin-top: 16px;
        margin-bottom: 16px;
        .buttonicon {
            width: 20px;
            height: 20px;
            font-size: 16px;
            padding-right: 4px;
        }
    }
</style>
