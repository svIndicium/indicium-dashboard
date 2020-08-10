<template>
    <div class="">
        <h2>Nieuwe studierichting</h2>
        <div class="form">
            <TextInput v-model="studyType.name" placeholder="Naam" />
        </div>
        <Button size="m" :callback="createStudyType" class="button"><Icon type="plus" class="buttonicon" /> Voeg toe</Button>
        <Loading v-if="loading" />
    </div>
</template>

<script>
    import TextInput from '../../components/TextInput';
    import Button from '../../components/button';
    import Icon from '../../components/Icon';
    import Loading from '@svindicium/indicium-components';

    export default {
        name: 'CreateStudyType',
        components: {
            Icon,
            TextInput,
            Button,
            Loading,
        },
        data: () => ({
            studyType: {
                name: '',
            },
            error: '',
            loading: false,
        }),
        methods: {
            async createStudyType() {
                this.loading = true;
                try {
                    await this.$api.post('/studytypes', this.studyType);
                    await this.$router.push({ name: 'studierichtingenoverzicht' });
                } catch (err) {
                    this.error = err.response.data.message;
                }
                this.loading = false;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/error";

    .form {
        margin: 16px 0;
    }
</style>
