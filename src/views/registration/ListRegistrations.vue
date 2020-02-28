<template>
    <div>
        <table>
            <tr>
                <th>id</th>
                <th>Naam</th>
                <th>Email</th>
            </tr>
            <tr v-for="(user, idx) in registrations" :key="idx" @click="viewUser(user.id)">
                <td>{{user.id}}</td>
                <td>{{ getFullName(user) }}</td>
                <td>{{user.email}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'ListRegistrations',
      data: () => ({
          registrations: []
      }),
      methods: {
          async getRegistrations() {
              const { data } = await this.$api.get("/registration");
              this.registrations = data;
          },
          viewUser(userId) {
              this.$router.push({ name: "listRegistrations", params: { userId } });
          },
          getFullName(user) {
              if (user.middleName) {
                  return `${user.firstName} ${user.middleName} ${user.lastName}`;
              }
              return `${user.firstName} ${user.lastName}`;
          }
      },
      async created() {
          await this.getRegistrations();
      }
  };
</script>

<style scoped>

</style>
