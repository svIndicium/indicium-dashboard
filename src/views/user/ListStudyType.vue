<template>
    <div>
        <h2>Studierichtingen</h2>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else-if="!error">
            <Button route-name="nieuwestudierichting" size="m" class="button" v-if="$auth.hasPermission('create:studyType')"><Icon type="plus" class="buttonicon"></Icon>Voeg toe</Button>
            <div class="table-container">
                <div class="header">ID #</div>
                <div class="header">Naam</div>
                <template v-for="(studyType, idx) in studyTypes">
                    <div v-bind:key="'id' + idx">{{studyType.id}}</div>
                    <div v-bind:key="'name' + idx">{{studyType.name}}</div>
                </template>
            </div>
        </div>
        <div v-else>
            <div class="errorcontainer">
                <Icon type="alert-circle" class="icon" />
                <span class="message">
                    {{ errorMessage }}
                </span>
            </div>
            <Button :callback="getStudyTypes" size="l" class="button"><Icon type="refresh" class="buttonicon" />Probeer opnieuw</Button>
        </div>
    </div>
</template>

<script>
    import Button from '../../components/button';
    import Loading from '../../components/Loading';
    import Icon from '../../components/Icon';

    export default {
        name: 'ListStudyType',
        components: {
            Button,
            Loading,
            Icon,
        },
        data: () => ({
            loading: false,
            error: null,
            studyTypes: [],
        }),
        methods: {
            async getStudyTypes() {
                this.loading = true;
                try {
                    const { data } = await this.$api.get('/studytype');
                    this.studyTypes = data;
                } catch (e) {
                    this.error = e;
                }
                this.loading = false;
            },
        },
        async created() {
            await this.getStudyTypes();
        },
        computed: {
            errorMessage() {
                if (this.error.message === 'Network Error') {
                    return 'Netwerk fout';
                }
                return this.error.message;
            }
        }
    };
</script>

<style lang="scss" scoped>

    .table-container {
        max-width: 500px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(5, 32px);
        align-items: stretch;

        .header {
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
        }

        div, span {
            line-height: 32px;
        }

        span {
            font-size: 24px;
            height: 32px;
        }
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
