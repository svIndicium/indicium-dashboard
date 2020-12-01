<template>
    <div class>
        <p class="error">{{JSON.stringify(error)}}</p>
        <TextInput v-model="user.firstName" placeholder="Voornaam" label="Voornaam" />
        <TextInput v-model="user.middleName" placeholder="Tussenvoegsel" label="Tussenvoegsel" />
        <TextInput v-model="user.lastName" placeholder="Achternaam" label="Achternaam" />
        <TextInput v-model="user.mailAddress" placeholder="Email" label="Email" />
        <TextInput v-model="user.phoneNumber" placeholder="Telefoonnummer" label="Telefoonnummer" />
        <DateInput v-model="user.dateOfBirth" placeholder="Geboortedatum" label="Geboortedatum" />
        <br />
        <SelectInput
            v-model="selectedStudyType"
            firstEmpty
            :items="studyTypes"
            label="Studierichting"
        ></SelectInput>
        <br />
        <label for="nieuwsbrief">Wilt de nieuwsbrief ontvangen?</label>
        <input type="checkbox" v-model="user.toReceiveNewsletter" id="nieuwsbrief" />
        <br />
        <Button size="m" :callback="createUser">Voeg toe</Button>
    </div>
</template>

<script>
import TextInput from "../../components/TextInput.vue";
import Button from "../../components/button.vue";
import SelectInput from "../../components/SelectInput.vue";
import DateInput from "@/components/DateInput";
export default {
    name: "CreateUser",
    components: {
        SelectInput,
        Button,
        TextInput,
        DateInput,
    },
    data() {
        return {
            studyTypes: [],
            selectedStudyType: "",
            user: {
                firstName: "",
                middleName: "",
                lastName: "",
                mailAddress: "",
                phoneNumber: "",
                dateOfBirth: new Date(),
                studyTypeId: "first",
                toReceiveNewsletter: false
            },
            error: ""
        };
    },
    async created() {
        await this.getStudyTypes();
    },
    methods: {
        async createUser() {
            try {
                await this.$api.post("/users", this.user);
                await this.$router.push({ name: "userDashboard" });
            } catch (err) {
                this.error = err.response.data.message;
            }
        },
        async getStudyTypes() {
            try {
                const { data } = await this.$api.get("/studytypes");
                const studyTypes = [];
                data.forEach((studyType) => studyTypes.push({key: studyType.name, value: studyType.id}))
                this.studyTypes = studyTypes;
            } catch (err) {
                this.error = err.response.data.message;
            }
        }
    },
    watch: {
        selectedStudyType(value) {
            this.user.studyTypeId = parseInt(value, 10);
        }
    }
};
</script>

<style lang="scss" scoped>
.center {
    margin-left: auto;
    margin-right: auto;
}
</style>
