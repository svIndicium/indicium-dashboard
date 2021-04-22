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
                    <v-card-title>{{$utils.getFullName(this.member.memberDetails.name)}}</v-card-title>
                    <v-tabs>
                        <v-tab
                            :to="{name: 'MemberViewInfo', params: {memberId: this.memberId}}"
                        >
                            <v-icon>mdi-information</v-icon>
                        </v-tab>
                        <v-tab
                            :to="{name: 'MemberViewMailAddresses', params: {memberId: this.memberId}}"
                        >
                            <v-icon>mdi-at</v-icon>
                        </v-tab>
                        <v-tab
                            :to="{name: 'MemberViewMembership', params: {memberId: this.memberId}}"
                        >
                            <v-icon>mdi-wallet-membership</v-icon>
                        </v-tab>
                        <v-tab
                            :to="{name: 'MemberViewPayments', params: {memberId: this.memberId}}"
                        >
                            <v-icon>mdi-currency-eur</v-icon>
                        </v-tab>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
        <router-view :memberId="memberId" :member="member" :studyType="studyType" :mailAddresses="mailAddresses" :payments="payments"></router-view>
    </v-container>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import {MailAddressService, MemberService, PaymentService, StudyTypeService} from "@/services";

export default {
    name: 'ViewMember',
    components: { Breadcrumbs },
    data: () => ({
        memberId: '',
        member: {},
        studyType: {},
        mailAddresses: [],
        payments: [],
    }),
    methods: {
        async getMemberData() {
            this.member = await MemberService.getMemberById(this.memberId);
            this.studyType = await StudyTypeService.getStudyTypeById(this.member.memberDetails.studyTypeId);
            this.mailAddresses = await MailAddressService.getMailAddressesByMemberId(this.memberId);
            this.payments = await PaymentService.getPaymentsForMemberId(this.memberId);
        },
    },
    async created() {
        this.memberId = this.$route.params.memberId;
        await this.getMemberData();
    },
    computed: {
    },
};
</script>

<style lang="scss" scoped>
</style>
