<template>
  <div class="">
    <p class="error">{{JSON.stringify(error)}}</p>
    <TextInput v-model="studyType.name" placeholder="Naam" />
    <Button size="m" :callback="createStudyType">Voeg toe</Button>
  </div>
</template>

<script>
import TextInput from '../../components/TextInput';
import Button from '../../components/button';

export default {
  name: 'CreateStudyType',
  components: {
    TextInput,
    Button,
  },
  data: () => ({
    studyType: {
      name: '',
    },
    error: '',
  }),
  methods: {
    async createStudyType() {
      try {
        await this.$api.post('/api/studytype', this.studyType);
        await this.$router.push({ name: 'listStudyType' });
      } catch (err) {
        this.error = err.response.data.message;
      }
    },
  },
};
</script>

<style scoped>

</style>
