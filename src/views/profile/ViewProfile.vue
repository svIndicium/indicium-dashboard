<template>
    <div>
        <h2>Profiel</h2>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <div class="section">
                <h3 class="section-header">Algemene informatie</h3>
                <div class="section-entry">
                    <p class="key">Voornaam</p>
                    <p class="value">{{this.user.firstName}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Achternaam</p>
                    <p class="value">{{this.user.lastName}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Geboortedatum</p>
                    <p class="value">{{this.getPrettyDate(this.user.dateOfBirth)}}</p>
                </div>
            </div>
            <div class="section">
                <h3 class="section-header">Opleidingsinformatie</h3>
                <div class="section-entry" v-if="this.user.studyType">
                    <p class="key">Studierichting</p>
                    <p class="value">{{this.user.studyType.name}}</p>
                </div>
            </div>
            <div class="section">
                <h3 class="section-header">Contact informatie</h3>
                <div class="section-entry">
                    <p class="key">Telefoonnummer</p>
                    <p class="value">{{prettyPhoneNumber}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Primaire e-mailadres</p>
                    <p class="value">{{this.user.email}}</p>
                </div>
            </div>
            <div class="section">
                <h3 class="section-header">Profiel informatie</h3>
                <div class="section-entry">
                    <p class="key">Laatst bewerkt op</p>
                    <p class="value">{{this.getPrettyDateTime(this.user.updated_at)}}</p>
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
            <Button :callback="getUserFromService" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Loading from '../../components/Loading';
    import Button from '../../components/button';
    import Icon from '../../components/Icon';

    export default {
        name: 'ViewProfile',
        components: {
            Loading,
            Button,
            Icon,
        },
        data: () => ({
            user: {},
            error: null,
            loading: false,
        }),
        methods: {
            getUser() {
                this.user = this.$auth.user;
            },
            async getUserFromService() {
                try {
                    const { data } = await this.$api.get('/user/userinfo');
                    this.user = { ...this.user, ...data };
                    await this.getStudyType();
                } catch (e) {
                    this.error = e;
                }
            },
            async getStudyType() {
                const { data } = await this.$api.get(`/studytype/${this.user.studyTypeId}`);
                this.user.studyType = data;
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
                return `${this.getPrettyDate(dateString)} ${date.getUTCHours()}:${date.getUTCSeconds()}`;
            },
            getPrettyDate(dateString) {
                const date = new Date(dateString);
                return `${date.getUTCDate()} ${this.getMonthAsString(date.getUTCMonth())} ${date.getFullYear()}`;
            },
        },
        async mounted() {
            this.loading = true;
            this.getUser();
            await this.getUserFromService();
            this.loading = false;
        },
        computed: {
            prettyPhoneNumber() {
                if (this.user.phoneNumber === undefined) return "";
                const phoneNumber = this.user.phoneNumber;
                return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 4)} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)} ${phoneNumber.slice(10, 12)}`;
            },
            errorMessage() {
                // if (this.error.message === 'Network Error') {
                //     return 'Netwerk fout';
                // }
                return this.error.message;
            }
        }
    };
</script>

<style lang="scss" scoped>


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



    .errorcontainer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: #FAC052;

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
            padding-right: 4px;
        }

    }
</style>
