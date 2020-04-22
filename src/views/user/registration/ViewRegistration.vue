<template>
    <div>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <h2>{{fullName}}</h2>
            <StatusLabel status="warning" v-if="registration.finalizedAt === undefined && registration.verifiedAt === undefined">Wachtend op mailverificatie</StatusLabel>
            <StatusLabel status="error" v-else-if="registration.finalizedAt === undefined">Wachtend op instemming</StatusLabel>
            <StatusLabel status="success" v-else-if="registration.approved">Ingestemd</StatusLabel>
            <StatusLabel status="error" v-else>Weggestemd</StatusLabel>
            <div class="action-buttons">
                <Button size="l" :url="whatsAppLink" class="contact-button"><Icon type="message" class="buttonicon" />Stuur Whatsapp bericht</Button>
                <Button size="l" :url="mailtoLink" class="contact-button"><Icon type="mail" class="buttonicon" />Stuur email</Button>
            </div>
            <div class="section">
                <h3 class="section-header">Contact informatie</h3>
                <div class="section-entry">
                    <p class="key">Telefoonnummer</p>
                    <p class="value">{{this.$utils.getPrettyPhoneNumber(this.registration.phoneNumber)}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Emailadres</p>
                    <p :class="['value', registration.verifiedAt !== null ? '' : 'error']">{{registration.mailAddress}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Wilt nieuwsbrief ontvangen</p>
                    <p class="value">{{registration.toReceiveNewsletter ? 'Ja' : 'Nee'}}</p>
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
                    <p class="value">{{this.$utils.getPrettyDateTime(this.registration.created)}}</p>
                </div>
                <div class="section-entry" v-if="!this.registration.verifiedAt">
                    <p class="key error">Mailadres bevestigd op</p>
                    <p class="value error">Nog niet bevestigd</p>
                </div>
                <div class="section-entry" v-else>
                    <p class="key">Mailadres bevestigd op</p>
                    <p class="value">{{this.$utils.getPrettyDateTime(this.registration.verifiedAt)}}</p>
                </div>
                <div class="section-entry" v-if="finalized">
                    <p class="key">Beoordeeld op</p>
                    <p class="value">{{this.$utils.getPrettyDateTime(this.registration.finalizedAt)}}</p>
                </div>
                <div class="section-entry" v-if="finalized">
                    <p class="key">Resultaat</p>
                    <p class="value">{{this.registration.approved ? 'Ingestemd' : 'Weggestemd'}}</p>
                </div>
                <div class="section-entry" v-if="!!this.registration.comment">
                    <p class="key">Reden</p>
                    <p class="value">{{this.registration.comment}}</p>
                </div>
            </div>
            <TextInput placeholder="Reden" v-model="reason" v-if="!finalized" class="reason" :error="fieldError.message"></TextInput>
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
    import Loading from '../../../components/Loading';
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
                    const { data } = await this.$api.get(`/registration/${registrationId}`);
                    this.registration = data;
                    await this.getStudyType();
                } catch (e) {
                    this.error = e;
                }
            },
            async getStudyType() {
                const { data } = await this.$api.get(`/studytype/${this.registration.studyTypeId}`);
                this.registration.studyType = data;
            },
            async approveRegistration() {
                this.loading = true;
                try {
                    const registrationId = this.$route.params.registrationId;
                    const { data } = await this.$api.post(`/registration/${registrationId}/finalize`, {approved: true});
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
                    const { data } = await this.$api.post(`/registration/${registrationId}/finalize`, {approved: false, comment: this.reason});
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
                return this.$utils.getPrettyDate(this.registration.dateOfBirth)
            },
            whatsAppLink() {
                if (this.registration.phoneNumber === undefined) return "";
                return `https://wa.me/${this.registration.phoneNumber.replace("+", "")}`;
            },
            fullName() {
                if (this.registration.middleName) {
                    return `${this.registration.firstName} ${this.registration.middleName} ${this.registration.lastName}`;
                }
                return `${this.registration.firstName} ${this.registration.lastName}`;
            },
            finalized() {
                return !!this.registration.finalizedAt;
            }
        }
    };
</script>

<style lang="scss" scoped>
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

    .section {
        max-width: 600px;

        .section-header {
            margin-top: 24px;
            font-weight: 300;
            font-size: 16px;
            text-transform: uppercase;
        }

        .section-entry {
            padding-top: 8px;
            font-size: 20px;
            display: flex;
            justify-content: space-between;
            .key {
            }

            .value {
                font-weight: 300;
            }

            .error {
                color: var(--indi-error);
            }
        }

        .action-buttons {
            display: flex;
            justify-content: flex-end;
        }

    }

    .backbutton {
        margin-top: 16px;
        font-size: 20px;
        cursor: pointer;
    }

    .action-buttons {
        display: flex;
        justify-content: flex-start;
        a {
            margin-right: 16px;
        }

        @media screen and (max-width: 898px) {
            a {
                margin-right: 0;
                width: 100%;
            }
            flex-wrap: wrap;
        }
    }

    .errorcontainer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: var(--indi-warning);

        .icon {
            width: 32px;
            height: 32px;
            font-size: 32px;
        }

        .message {
            padding-left: 8px;
        }
    }

    .button {
        margin-top: 16px;
        .buttonicon {
            font-size: 16px;
            width: 24px;
            height: 24px;
            padding-right: 4px;
        }

    }
</style>
