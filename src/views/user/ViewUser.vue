<template>
    <div>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <h2>{{fullName}}</h2>
            <div class="action-buttons">
                <Button size="l" :url="whatsAppLink" class="contact-button"><Icon type="message" class="buttonicon" />Stuur Whatsapp bericht</Button>
                <Button size="l" :url="mailtoLink" class="contact-button"><Icon type="mail" class="buttonicon" />Stuur email</Button>
            </div>
            <div class="section">
                <h3 class="section-header">Contact informatie</h3>
                <div class="section-entry">
                    <p class="key">Telefoonnummer</p>
                    <p class="value">{{this.prettyPhoneNumber}}</p>
                </div>
                <div v-for="(mailAddress, index) in this.mailAddresses" :key="index">
                    <div class="section-entry">
                        <p class="key">Primaire e-mailadres</p>
                        <p :class="['value', mailAddress.verifiedAt !== null ? '' : 'error']">{{mailAddress.address}}</p>
                    </div>
                    <div class="section-entry" v-if="mailAddress.verifiedAt === null">
                        <p class="key">Verificatie aangevraagd op</p>
                        <p class="value">{{getPrettyDateTime(mailAddress.verificationRequestedAt)}}</p>
                    </div>
                    <div class="action-buttons">
                        <Button size="l" v-if="mailAddress.verifiedAt === null">Request new verification</Button>
                    </div>
                </div>
            </div>

            <div class="section">
                <h3 class="section-header">Lidmaatschap informatie</h3>
                <div class="section-entry">
                    <p class="key">Lid sinds</p>
                    <p class="value">1 september 2019</p>
                </div>
                <div class="section-entry">
                    <p class="key">Ontvangt nieuwsbrief</p>
                    <p class="value">{{receivesNewsletter ? 'Ja' : 'Nee'}}</p>
                </div>
            </div>

            <div class="section">
                <h3 class="section-header">Persoonlijke informatie</h3>
                <div class="section-entry">
                    <p class="key">Geboortedatum</p>
                    <p class="value">{{this.getPrettyDate(this.user.dateOfBirth)}}</p>
                </div>
                <div class="section-entry" v-if="!!user.studyType">
                    <p class="key">Studierichting</p>
                    <p class="value">{{this.user.studyType.name}}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="errorcontainer">
                <Icon type="alert-circle" class="icon" />
                <span class="message">
                    {{ errorMessage }}
                </span>
            </div>
            <Button :callback="getUser" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Button from '../../components/button.vue';
    import Icon from '../../components/Icon.vue';
    import Loading from '../../components/Loading.vue';

    export default {
        name: 'ViewUser',
        components: { Button, Icon, Loading },
        data: () => ({
            loading: false,
            error: null,
            user: {},
            mailAddresses: []
        }),
        methods: {
            async getUser() {
                this.error = null;
                const userId = this.$route.params.userId;
                const { data } = await this.$api.get(`/user/${userId.toString().indexOf('|') !== -1 ? 'a/' : ''}${userId}`);
                this.user = data;
                await this.getStudyType();
            },
            async getStudyType() {
                const { data } = await this.$api.get(`/studytype/${this.user.studyTypeId}`);
                this.user.studyType = data;
            },
            async getMailAddresses() {
                const userId = this.$route.params.userId;
                const { data } = await this.$api.get(`/user/${userId.toString().indexOf('|') !== -1 ? 'a/' : ''}${userId}/mailaddresses`);
                this.mailAddresses = data;
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
            getPrettyDateTime(dateString) {
                const date = new Date(dateString);
                return `${this.getPrettyDate(dateString)} ${date.getHours()}:${date.getSeconds()}`;
            },
            getPrettyDate(dateString) {
                const date = new Date(dateString);
                return `${date.getDate()} ${this.getMonthAsString(date.getMonth())} ${date.getFullYear()}`;
            },
        },
        async created() {
            this.loading = true;
            try {
                await this.getUser();
                await this.getMailAddresses();
            } catch (e) {
                this.error = e;
            }
            this.loading = false;
        },
        computed: {
            fullName() {
                if (this.user.middleName) {
                    return `${this.user.firstName} ${this.user.middleName} ${this.user.lastName}`;
                }
                return `${this.user.firstName} ${this.user.lastName}`;
            },
            mailtoLink() {
                if (this.mailAddresses.length !== 0) {
                    return `mailto:${this.mailAddresses[0].address}`;
                }
                return "";
            },
            dateOfBirth() {
                const date = new Date(this.user.dateOfBirth);
                return `${date.getDate()} ${this.getMonthAsString(date.getMonth())} ${date.getFullYear()}`;
            },
            whatsAppLink() {
                if (this.user.phoneNumber === undefined) return "";
                return `https://wa.me/${this.user.phoneNumber.replace("+", "")}`;
            },
            prettyPhoneNumber() {
                if (this.user.phoneNumber === undefined) return "";
                const phoneNumber = this.user.phoneNumber;
                return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 4)} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)} ${phoneNumber.slice(10, 12)}`;
            },
            receivesNewsletter() {
                if (this.mailAddresses.length === 0) return false;
                for (let mailAddress in this.mailAddresses) {
                    if (this.mailAddresses.hasOwnProperty(mailAddress)) {
                        if (mailAddress.receivesNewsletter) {
                            return true;
                        }
                    }
                }
                return false;
            },
            errorMessage() {
                if (this.error.message === 'Network Error') {
                    return 'Netwerk fout';
                }
                return this.error.message;
            }
        },
    };
</script>

<style lang="scss" scoped>
    .contact-button {
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
                color: red;
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
            width: 20px;
            height: 20px;
            padding-right: 4px;
        }

    }
</style>
