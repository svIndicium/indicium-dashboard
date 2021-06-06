<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <Breadcrumbs />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>{{$utils.getFullName(this.registration.memberDetails.name)}}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <router-view :registrationId="registrationId" :registration="registration" :studyType="studyType" ref="child"></router-view>
    </v-container>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import {MailAddressService, MemberService, PaymentService, RegistrationService, StudyTypeService} from "@/services";

export default {
    name: 'ViewRegistration',
    components: { Breadcrumbs },
    data: () => ({
        registrationId: '',
        registration: {},
        studyType: {},
    }),
    methods: {
        async getRegistrationData() {
            this.registration = await RegistrationService.getRegistrationsById(this.registrationId);
            this.studyType = await StudyTypeService.getStudyTypeById(this.registration.memberDetails.studyTypeId);
        },
    },
    async created() {
        this.registrationId = this.$route.params.registrationId;
        await this.getRegistrationData();
        this.$refs.child.$on('reviewedRegistration', this.getRegistrationData);
    },
};
</script>

<style lang="scss" scoped>
</style>
