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
                    <p class="value">{{$utils.getPrettyPhoneNumber(this.member.memberDetails.phoneNumber)}}</p>
                </div>
                <div v-for="(mailAddress, index) in this.mailAddresses" :key="index">
                    <div class="section-entry">
                        <p class="key">Primaire e-mailadres</p>
                        <p :class="['value', mailAddress.verifiedAt !== null ? '' : 'error']">{{mailAddress.address}}</p>
                    </div>
                    <div class="section-entry" v-if="mailAddress.verifiedAt === null">
                        <p class="key">Verificatie aangevraagd op</p>
                        <p class="value">{{$utils.getPrettyDateTime(mailAddress.verificationRequestedAt)}}</p>
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
                    <p class="value">{{$utils.getPrettyDate(this.member.dateOfBirth)}}</p>
                </div>
                <div class="section-entry" v-if="!!user.studyType">
                    <p class="key">Studierichting</p>
                    <p class="value">{{this.member.studyType.name}}</p>
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
            <Button :callback="getMember" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Button from '../../components/button.vue';
    import Icon from '../../components/Icon.vue';
    import Loading from '@svindicium/indicium-components';

    export default {
        name: 'ViewUser',
        components: { Button, Icon, Loading },
        data: () => ({
            loading: false,
            error: null,
            member: {},
            mailAddresses: []
        }),
        methods: {
            async getMember() {
                this.error = null;
                const memberId = this.$route.params.memberId;
                const { data } = await this.$api.get(`/members/${memberId}`);
                this.member = data;
                await this.getStudyType();
            },
            async getStudyType() {
                const { data } = await this.$api.get(`/studytypes/${this.member.memberDetails.studyTypeId}`);
                this.member.studyType = data;
            },
            async getMailAddresses() {
                const memberId = this.$route.params.memberId;
                const { data } = await this.$api.get(`/members/${memberId}/mailaddresses`);
                this.mailAddresses = data;
            },
        },
        async created() {
            this.loading = true;
            try {
                await this.getMember();
                await this.getMailAddresses();
            } catch (e) {
                this.error = e;
            }
            this.loading = false;
        },
        computed: {
            fullName() {
                if (this.member.memberDetails.name.middleName) {
                    return `${this.member.memberDetails.name.firstName} ${this.member.memberDetails.name.middleName} ${this.member.memberDetails.name.lastName}`;
                }
                return `${this.member.memberDetails.name.firstName} ${this.member.memberDetails.name.lastName}`;
            },
            mailtoLink() {
                if (this.mailAddresses.length !== 0) {
                    return `mailto:${this.mailAddresses[0].address}`;
                }
                return "";
            },
            whatsAppLink() {
                if (this.member.phoneNumber === undefined) return "";
                return `https://wa.me/${this.member.phoneNumber.replace("+", "")}`;
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
    @import "./src/assets/scss/profile";
    @import "./src/assets/scss/error";

    .backbutton {
        margin-top: 16px;
        font-size: 20px;
        cursor: pointer;
    }
</style>
