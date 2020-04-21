<template>
    <div>
        <h2>Ledenadministratie</h2>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <div v-for="(setting, idx) in settings" :key="idx">
                <h4>{{setting.title}}</h4>
                <p>{{setting.description}}<br>{{getUpdatedMessage(setting)}}</p>
                <div class="input">
                    <text-input :value="setting.value" v-model="setting.value" :error="fieldErrors[setting.key]" />
                    <div>
                        <Button size="m" :callback="() => {}" @click.native="saveSetting(setting)" class="savebutton">Bewaar</Button>
                    </div>
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
            <Button :callback="getAvailableSettings" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Loading from '../../components/Loading';
    import Icon from '../../components/Icon';
    import Button from '../../components/button';
    import TextInput from '../../components/TextInput';

    export default {
        name: 'SettingsPage',
        components: {
            TextInput,
            Loading,
            Button,
            Icon,
        },
        data: () => ({
            app: null,
            settings: null,
            error: null,
            loading: false,
            fieldErrors: {},
        }),
        async created() {
            this.loading = true;
            this.getAppName();
            await this.getAvailableSettings();
            this.loading = false;
        },
        methods: {
            async getAvailableSettings() {
                this.error = null;
                try {
                    const { data } = await this.$api.get('/settings/lit');
                    this.settings = data;
                    this.settings.sort(this.compare);
                } catch (e) {
                    this.error = e;
                }
            },
            compare(a, b) {
                let comparison = 0;
                if (a.key > b.key) {
                    comparison = 1;
                } else if (a.key < b.key) {
                    comparison = -1;
                }
                return comparison;
            },
            getAppName() {
                this.app = this.$route.params.app;
            },
            getUpdatedMessage(setting) {
                if (setting.updatedAt === null || setting.updatedBy === null) return 'Deze instelling is nooit aangepast.';
                return `Voor het laatst aangepast op ${this.getPrettyDateTime(setting.updatedAt)} door ${setting.updatedBy}`;
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
            async saveSetting(setting) {
                this.loading = true;
                try {
                    const { data } = await this.$api.put(`/settings/lit/${setting.key}`, {value: setting.value});
                    for (let settingsKey in this.settings) {
                        if (this.settings.hasOwnProperty(settingsKey)) {
                            if (this.settings[settingsKey].key === setting.key) {
                                this.settings[settingsKey] = data;
                            }
                        }
                    }
                } catch (e) {
                    const { error } = JSON.parse(e.request.response);
                    this.fieldErrors[setting.key] = error.errors[0].message;
                }
                this.loading = false;
            }
        },
        computed: {
            errorMessage() {
                if (this.error.message === 'Network Error') {
                    return 'Netwerk fout';
                }
                return this.error.message;
            }
        }
    };
</script>

<style lang="scss" scoped>

    h4 {
        font-size: 18px;
    }

    p {
        font-size: 14px;
    }

    .input {
        display: flex;
        .savebutton {
            margin-left: 16px;
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
            width: 20px;
            height: 20px;
            font-size: 16px;
            padding-right: 4px;
        }

    }

</style>
