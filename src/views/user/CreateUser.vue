<template>
  <div class="center">
    <p class="error">{{JSON.stringify(error)}}</p>
    <TextInput v-model="user.firstName" placeholder="Voornaam" />
    <TextInput v-model="user.middleName" placeholder="Tussenvoegsel" />
    <TextInput v-model="user.lastName" placeholder="Achternaam" />
    <TextInput v-model="user.email" placeholder="Email" />
    <TextInput v-model="user.phoneNumber" placeholder="Telefoonnummer" />
    <input type="date" v-model="user.dateOfBirth" placeholder="Geboortedatum" /><br>
    <SelectInput v-model="selectedStudyType"
                 firstEmpty
                 :items="studyTypes"
                 valueAttribute="id"
                 displayAttribute="name"
                 label="Studierichting"></SelectInput><br>
    <label for="nieuwsbrief">Wilt de nieuwsbrief ontvangen?</label>
    <input type="checkbox" v-model="user.toReceiveNewsLetter" id="nieuwsbrief"><br>
    <Button size="m" :callback="createUser">Voeg toe</Button>
  </div>
</template>

<script>
import axios from 'axios';
import TextInput from '../../components/TextInput.vue';
import Button from '../../components/button.vue';
import SelectInput from '../../components/SelectInput.vue';

export default {
  name: 'Create',
  components: {
    SelectInput,
    Button,
    TextInput,
  },
  data() {
    return {
      studyTypes: [],
      selectedStudyType: '',
      user: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        studyTypeId: 'first',
        toReceiveNewsLetter: false,
      },
      error: '',
    };
  },
  async created() {
    const { data } = await this.$api.get('/api/studytype');
    this.studyTypes = data;
  },
  methods: {
    async createUser() {
      try {
        await this.$api.post('/api/user', this.user);
        await this.$router.push({ name: 'listUser' });
      } catch (err) {
        this.error = err.response.data.message;
      }
    },
  },
  watch: {
    selectedStudyType(value) {
      this.user.studyTypeId = parseInt(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>
