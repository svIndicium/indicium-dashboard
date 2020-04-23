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
                    <p class="value">{{this.$utils.getPrettyDate(this.user.dateOfBirth)}}</p>
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
                    <p class="value">{{this.$utils.getPrettyPhoneNumber(this.user.phoneNumber)}}</p>
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
                    <p class="value">{{this.$utils.getPrettyDateTime(this.user.updated_at)}}</p>
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
                this.error = null;
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
        },
        async mounted() {
            this.loading = true;
            this.getUser();
            await this.getUserFromService();
            this.loading = false;
        },
        computed: {
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
    @import "src/assets/scss/profile";
    @import "src/assets/scss/error";
</style>
