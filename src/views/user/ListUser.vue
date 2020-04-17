<template>
    <div>
        <div v-if="loading">
            <Loading />
        </div>
        <table v-else-if="!error">
            <tr>
                <th>Voornaam</th>
                <th>Achternaam</th>
            </tr>
            <tr v-for="(user, idx) in users" :key="idx" @click="viewUser(user.id)">
                <td>{{user.firstName}}</td>
                <td>{{getFullLastName(user)}}</td>
            </tr>
        </table>
        <div v-else>
            <div class="errorcontainer">
                <Icon type="alert-circle" class="icon" />
                <span class="message">
                    {{ errorMessage }}
                </span>
            </div>
            <Button :callback="getUsers" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
import Loading from '../../components/Loading';
import Icon from '../../components/Icon';
import Button from '../../components/button';

export default {
    name: "List",
    components: { Button, Icon, Loading },
    data: () => ({
        users: [],
        error: null,
        loading: false,
    }),
    methods: {
        async getUsers() {
            this.loading = true;
            try {
                const { data } = await this.$api.get("/user");
                this.users = data;
            } catch (e) {
                console.log(e);
                this.error = e;
            }
            this.loading = false;
        },
        viewUser(userId) {
            this.$router.push({ name: "viewUser", params: { userId } });
        },
        getFullLastName(user) {
            if (user.middleName) {
                return `${user.middleName} ${user.lastName}`;
            }
            return `${user.lastName}`;
        }
    },
    async created() {
        await this.getUsers();
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
table {
    box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.1);
    width: 50%;
    border-collapse: collapse;

    th {
        font-weight: inherit;
        text-transform: capitalize;
        width: fit-content;
        border-bottom: 1px solid rgba(141, 143, 145, 0.7);
    }

    td,
    th {
        padding: 4px;
    }

    td {
        border-bottom: 1px solid rgba(141, 143, 145, 0.44);
    }

    tr:not(:first-child) {
        cursor: pointer;

        &:hover {
            background-color: #eee;
        }
    }

    tr:last-child {
        td {
            border-bottom: none;
        }
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
