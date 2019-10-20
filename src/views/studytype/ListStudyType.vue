<template>
  <div class="center">
    <Button url="/studytypes/create" v-if="this.$auth.hasPermission('create:studyType')">
      Voeg een studierichting toe
    </Button>
    <table>
      <tr>
        <th>id</th>
        <th>Naam</th>
      </tr>
      <tr v-for="(studyType, idx) in studyTypes" :key="idx">
        <td>{{ studyType.id }}</td>
        <td>{{ studyType.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Button from '../../components/button';

export default {
  name: 'ListStudyType',
  components: {
    Button,
  },
  data: () => ({
    studyTypes: [],
  }),
  methods: {
    async getStudyTypes() {
      const { data } = await this.$api.get('/api/studytype');
      this.studyTypes = data;
    },
  },
  async created() {
    await this.getStudyTypes();
  },
};
</script>

<style lang="scss" scoped>

  table {
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.1);
    width: 50%;
    border-collapse: collapse;
    th {
      font-weight: inherit;
      text-transform: capitalize;
      width: fit-content;
      border-bottom: 1px solid rgba(141, 143, 145, 0.7);
    }

    td, th {
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
