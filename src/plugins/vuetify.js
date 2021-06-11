import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import {colors} from "vuetify/lib";

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                primary: "#72c9e0",
                secondary: '#73C2B6',
                accent: '#8c9eff',
                error: '#b71c1c',
                background: '#f2f2f2',
            },
            dark: {
                primary: "#447887",
                secondary: '#45756d',
                accent: '#8c9eff',
                error: '#b71c1c',
                background: '#2F3437',
            }
        },
        options: {
            customProperties: true
        }
    }
}

export default new Vuetify(opts)
