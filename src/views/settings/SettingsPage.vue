<template>
    <div>
        <h2>Ledenadministratie</h2>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <div class="table-container">
                <div class="header">Instelling</div>
                <div class="header">Bijgewerkt op</div>
                <div class="header">Bijgewerkt door</div>
                <template v-for="(setting, idx) in settings">
                    <div v-bind:key="'title' + idx">{{setting.title}}</div>
                    <div v-bind:key="'ua' + idx">{{setting.updatedAt}}</div>
                    <div v-bind:key="'ub' + idx">{{setting.updatedBy}}</div>
                </template>
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

    export default {
        name: 'SettingsPage',
        components: {
            Loading,
            Button,
            Icon,
        },
        data: () => ({
            app: null,
            settings: null,
            error: null,
            loading: false,
        }),
        async created() {
            this.getAppName();
            await this.getAvailableSettings();
        },
        methods: {
            async getAvailableSettings() {
                this.loading = true;
                const { data } = await this.$api.get('/settings/lit');
                this.settings = data;
                this.loading = false;
            },
            getAppName() {
                this.app = this.$route.params.app;
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

    .table-container {
        max-width: 700px;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-rows: 32px;
        align-items: stretch;

        .header {
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
        }

        div, span {
            line-height: 32px;
        }

        span {
            font-size: 24px;
            height: 32px;
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
