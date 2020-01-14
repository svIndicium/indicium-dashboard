<template>
    <div class="">
      <h4>{{fullName}}</h4>
      <h5>Email</h5>
      <a :href="mailtoLink">{{this.user.email}}</a>
      <h5>Telefoonnummer</h5>
      <p>{{this.user.phoneNumber}}</p>
      <h5>Geboortedatum</h5>
      <p>{{dateOfBirth}}</p>
      <h5>Afstudeerrichting</h5>
      <p>{{this.user.studyType.name}}</p>
      <h5>Ontvangt nieuwsbrief?</h5>
      <p>{{this.user.toReceiveNewsletter ? 'Ja' : 'Nee'}}</p>
      <Button size="m" url="/leden">Terug</Button>
    </div>
</template>

<script>
import Button from '../../components/button.vue';

export default {
  name: 'View',
  components: { Button },
  props: ['userId'],
  data: () => ({
    user: {},
  }),
  methods: {
    async getUser() {
      const { data } = await this.$api.get(`/api/user/${this.userId}`);
      this.user = data;
    },
    getMonthAsString(currentMonth) {
      const monthList = [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'November',
        'December',
      ];

      return monthList[currentMonth];
    },
  },
  async created() {
    await this.getUser();
  },
  computed: {
    fullName() {
      if (this.user.middleName) {
        return `${this.user.firstName} ${this.user.middleName} ${this.user.lastName}`;
      }
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    mailtoLink() {
      return `mailto:${this.user.email}`;
    },
    dateOfBirth() {
      const date = new Date(this.user.dateOfBirth);
      return `${date.getDate()} ${this.getMonthAsString(date.getMonth())} ${date.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
