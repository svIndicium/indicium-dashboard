<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <Breadcrumbs />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                :md="2"
                :cols="12"
            >
                <v-card>
                    <v-navigation-drawer>

                        <v-list
                            dense
                            nav
                        >
                            <v-list-item
                                v-for="item in items"
                                :key="item.title"
                                link
                                :to="item.to"
                            >
                                <v-list-item-icon>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-navigation-drawer>
                </v-card>
            </v-col>
            <v-col
                :cols="12"
                :md="10"
            >
                <router-view></router-view>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";

export default {
    name: "Settings",
    components: {
        Breadcrumbs,
    },
    data: () => ({
        items: [
            {
                icon: 'mdi-shape',
                title: 'Thema',
                to: {
                    name: 'ThemeSettings'
                }
            },
            {
                icon: 'mdi-currency-eur',
                title: 'Betalingen',
                to: {
                    name: 'PaymentSettings'
                }
            }
        ]
    }),
}
</script>

<style scoped>

</style>
