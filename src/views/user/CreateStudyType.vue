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
    import Loading from '../../components/Loading';

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
                    await this.$api.post('/studytype', this.studyType);
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

    .form {
        margin: 16px 0;
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
