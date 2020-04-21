<template>
    <div>
        <h2>Aanmeldingen</h2>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error" class="table-container">
            <div class="header">Voornaam</div>
            <div class="header">Achternaam</div>
            <div class="header">Status</div>
            <template v-for="(registration, idx) in registrations">
                <div v-bind:key="'firstName' + idx">{{registration.firstName}}</div>
                <div v-bind:key="'lastName' + idx">{{getFullLastName(registration)}}</div>
                <div v-bind:key="'status' + idx">
                    <StatusLabel status="warning" v-if="registration.finalizedAt === undefined && registration.verifiedAt === undefined">Wachtend op mailverificatie</StatusLabel>
                    <StatusLabel status="error" v-else-if="registration.finalizedAt === undefined">Wachtend op instemming</StatusLabel>
                    <StatusLabel status="success" v-else-if="registration.approved">Ingestemd</StatusLabel>
                    <StatusLabel status="error" v-else>Weggestemd</StatusLabel>
                </div>
            </template>
        </div>
        <div v-else>
            <div class="errorcontainer">
                <Icon type="alert-circle" class="icon" />
                <span class="message">
                    {{ errorMessage }}
                </span>
            </div>
            <Button :callback="getRegistrations" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Loading from '../../../components/Loading';
    import Icon from '../../../components/Icon';
    import StatusLabel from '../../../components/StatusLabel';
    export default {
        name: 'ListRegistrations',
        components: {
            Loading,
            Icon,
            StatusLabel,
        },
        data: () => ({
            registrations: null,
            error: null,
            loading: false,
        }),
        methods: {
            async getRegistrations() {
                this.error = null;
                try {
                    const { data } = await this.$api.get("/registration");
                    this.registrations = data;
                } catch (e) {
                    this.error = e;
                }
            },
            viewRegistration(registrationId) {
                this.$router.push({ name: "viewRegistration", params: { registrationId } });
            },
            getFullLastName(user) {
                if (user.middleName) {
                    return `${user.middleName} ${user.lastName}`;
                }
                return `${user.lastName}`;
            }
        },
        async created() {
            await this.getRegistrations();
        }
    };
</script>

<style lang="scss" scoped>
    .table-container {
        max-width: 700px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(5, 32px);
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
</style>
