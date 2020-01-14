<template>
    <div class>
        <table>
            <tr>
                <th>id</th>
                <th>Naam</th>
                <th>Email</th>
            </tr>
            <tr v-for="(user, idx) in users" :key="idx" @click="viewUser(user.id)">
                <td>{{user.id}}</td>
                <td>{{ getFullName(user) }}</td>
                <td>{{user.email}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "List",
    data: () => ({
        users: []
    }),
    methods: {
        async getUsers() {
            const { data } = await this.$api.get("/api/user");
            this.users = data;
        },
        viewUser(userId) {
            this.$router.push({ name: "viewUser", params: { userId } });
        },
        getFullName(user) {
            if (user.middleName) {
                return `${user.firstName} ${user.middleName} ${user.lastName}`;
            }
            return `${user.firstName} ${user.lastName}`;
        }
    },
    async created() {
        await this.getUsers();
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
</style>
