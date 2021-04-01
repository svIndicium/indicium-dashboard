<template>
    <div class="card">
        <div class="header" @click="toggleOpen">
            <div>
                <h3>{{$utils.getPrettyCurrency(transaction.amount)}}</h3>
            </div>
            <div class="status">
                <StatusLabel :status="getStatusColor">{{getStatus}}</StatusLabel>
            </div>
            <div>
                <p>{{getPaymentProvider}}</p>
            </div>
            <div>
                <p>{{$utils.getPrettyDateTime(transaction.createdAt)}}</p>
            </div>
            <div class="icon">
                <Icon :type="getIcon"></Icon>
            </div>
        </div>
        <div class="body" v-if="open">
            <h6>Transactie id: {{ transaction.id }}</h6>
            <div class="section-entry" v-if="isIDeal">
                <p class="key">Voor het laatst geupdated op</p>
                <p class="value">{{$utils.getPrettyDateTime(transaction.updatedAt)}}</p>
            </div>
            <div v-if="transaction.status === 'OPEN'">
                <div class="section-entry" v-if="isIDeal">
                    <p class="key">Verloopt op</p>
                    <p class="value">{{$utils.getPrettyDateTime(transaction.expiresAt)}}</p>
                </div>
            </div>
            <div v-else-if="transaction.status === 'PAID'">
                <div class="section-entry" v-if="isIDeal">
                    <p class="key">Voldaan op</p>
                    <p class="value">{{$utils.getPrettyDateTime(transaction.finishedAt)}}</p>
                </div>
            </div>
            <div v-else-if="transaction.status === 'EXPIRED'">
                <div class="section-entry" v-if="isIDeal">
                    <p class="key">Verlopen op</p>
                    <p class="value">{{$utils.getPrettyDateTime(transaction.expiresAt)}}</p>
                </div>
            </div>
            <div v-else-if="transaction.status === 'FAILED'">
                <div class="section-entry" v-if="isIDeal">
                    <p class="key">Verlopen op</p>
                    <p class="value">{{$utils.getPrettyDateTime(transaction.expiresAt)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StatusLabel from "@/components/StatusLabel";
import Icon from "@/components/Icon";

export default {
    name: "TransactionCard",
    components: {
        Icon,
        StatusLabel
    },
    data: () => ({
        open: false
    }),
    props: {
        transaction: {
            type: Object,
            required: true,
        }
    },
    methods: {
        toggleOpen() {
            this.open = !this.open;
        }
    },
    computed: {
        getStatusColor() {
            return {
                OPEN: 'success',
                PENDING: 'success',
                PAID: 'success',
                EXPIRED: 'error',
                FAILED: 'error',
            }[this.transaction.status]
        },
        getStatus() {
            return {
                OPEN: 'Open',
                PENDING: 'In afwachting',
                PAID: 'Betaald',
                EXPIRED: 'Verlopen',
                FAILED: 'Mislukt',
            }[this.transaction.status]
        },
        getPaymentProvider() {
            return {
                mollie: 'iDeal'
            }[this.transaction.paymentProvider]
        },
        getIcon() {
            return this.open ? 'chevron-up' : 'chevron-down';
        },
        isIDeal() {
            return this.transaction.paymentProvider === 'mollie';
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    display: inline-flex;
    position: relative;
    min-width: 600px;
    flex: 1;
    flex-direction: column;
    margin: 16px 16px 16px;
    background: var(--inner-sidebar-background);
    box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.2);
    transition: box-shadow 300ms;

    &:hover {
        box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.3);
    }

    .header {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 16px;
        cursor: pointer;

        .status, div > p {
            line-height: 40px;
        }

        .icon {
            height: 40px;
            width: 40px;
        }
    }

    .body {
        padding: 0 16px 16px 16px;

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
    }
}
</style>
