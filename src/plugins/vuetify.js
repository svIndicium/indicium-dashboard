import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                primary: "#72c9e0",
                secondary: '#73C2B6',
                accent: '#8c9eff',
                error: '#b71c1c',
            }
        }
    }
}

export default new Vuetify(opts)
