<template>
    <div class="">
        <TextInput v-model="studyType.name" placeholder="Naam" />
        <Button size="m" :callback="createStudyType" class="button"><Icon type="plus" class="buttonicon" /> Voeg toe</Button>
    </div>
</template>

<script>
    import TextInput from '../../components/TextInput';
    import Button from '../../components/button';
    import Icon from '../../components/Icon';

    export default {
        name: 'CreateStudyType',
        components: {
            Icon,
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
                    await this.$api.post('/studytype', this.studyType);
                    await this.$router.push({ name: 'studierichtingenoverzicht' });
                } catch (err) {
                    this.error = err.response.data.message;
                }
            },
        },
    };
</script>

<style lang="scss" scoped>

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
