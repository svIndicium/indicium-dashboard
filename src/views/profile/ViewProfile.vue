<template>
    <div>
        <h2>Profiel</h2>
        <div>
            <div class="section">
                <h3 class="section-header">Algemene informatie</h3>
                <div class="section-entry">
                    <p class="key">Voornaam</p>
                    <p class="value">{{this.tokenData.given_name}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Achternaam</p>
                    <p class="value">{{this.tokenData.family_name}}</p>
                </div>
                <div class="section-entry" v-if="!memberIsLoading">
                    <p class="key">Geboortedatum</p>
                    <p class="value">{{this.$utils.getPrettyDate(this.member.memberDetails.dateOfBirth)}}</p>
                </div>
            </div>
            <div class="section" v-if="!studyTypeIsLoading">
                <h3 class="section-header">Opleidingsinformatie</h3>
                <div class="section-entry" v-if="this.member.studyType">
                    <p class="key">Studierichting</p>
                    <p class="value">{{this.member.studyType.name}}</p>
                </div>
            </div>
            <div class="section">
                <h3 class="section-header">Contact informatie</h3>
                <div class="section-entry" v-if="!memberIsLoading">
                    <p class="key">Telefoonnummer</p>
                    <p class="value">{{this.$utils.getPrettyPhoneNumber(this.member.memberDetails.phoneNumber)}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Primaire e-mailadres</p>
                    <p class="value">{{this.tokenData.email}}</p>
                </div>
            </div>
        </div>
        <div v-if="error">
            <div class="errorcontainer">
                <Icon type="alert-circle" class="icon" />
                <span class="message">
                    {{ errorMessage }}
                </span>
            </div>
            <Button :callback="requestData" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
import Button from '../../components/button';
import Icon from '../../components/Icon';
import {FETCH_PROFILE} from "@/store/actions";

export default {
    name: 'ViewProfile',
    components: {
        Button,
        Icon,
    },
    data: () => ({
        error: null,
        loading: false,
        userLoading: true,
    }),
    methods: {
        async requestData() {
            await this.$store.dispatch(FETCH_PROFILE);
        },
    },
    async mounted() {
        await this.requestData();
    },
    computed: {
        errorMessage() {
            if (this.error.status === 404) {
                return "Profiel niet gevonden.";
            } else if (this.error.status === 403) {
                return "Verboden toegang.";
            }
            return this.error.message;
        },
        tokenData() {
            return this.$store.state.user.idTokenParsed;
        },
        member() {
            return this.$store.state.user.member;
        },
        memberIsLoading() {
            return this.$store.state.user.memberIsLoading;
        },
        studyTypeIsLoading() {
            return this.$store.state.user.studyTypeIsLoading;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/profile";
@import "src/assets/scss/error";
</style>
