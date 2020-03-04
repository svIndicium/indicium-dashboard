<template>
    <div>
        <table v-if="!error">
            <tr>
                <th>id</th>
                <th>Naam</th>
                <th>Email</th>
            </tr>
            <tr v-for="(registration, idx) in registrations" :key="idx" @click="viewRegistration(registration.id)">
                <td>{{registration.id}}</td>
                <td>{{ getFullName(registration) }}</td>
                <td>{{registration.email}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'ListRegistrations',
      data: () => ({
          registrations: [],
          error: null
      }),
      methods: {
          async getRegistrations() {
              try {
                  const { data } = await this.$api.get("/registration?finalized=false");
                  this.registrations = data;
              } catch (e) {
                  this.error = e;
              }
          },
          viewRegistration(registrationId) {
              this.$router.push({ name: "viewRegistration", params: { registrationId } });
          },
          getFullName(registration) {
              if (registration.middleName) {
                  return `${registration.firstName} ${registration.middleName} ${registration.lastName}`;
              }
              return `${registration.firstName} ${registration.lastName}`;
          }
      },
      async created() {
          await this.getRegistrations();
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
