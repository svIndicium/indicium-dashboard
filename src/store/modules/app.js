import {LOAD_THEME_SETTINGS, TOGGLE_DARK_MODE} from "@/store/actions";
import {STORE_THEME_SETTINGS} from "@/store/mutations";



const getDefaultState = () => {
    return {
        themeSettings: {
            darkMode: false
        }
    }
}

const state = getDefaultState();

const getters = {
    isDarkModeEnabled() {
        return state.themeSettings.darkMode;
    }
}

const actions = {
    [TOGGLE_DARK_MODE]({commit}, vuetify) {
        let updatedValue = {darkMode: !state.themeSettings.darkMode}
        vuetify.theme.dark = !state.themeSettings.darkMode;
        commit(STORE_THEME_SETTINGS, updatedValue);
    },
    [LOAD_THEME_SETTINGS]({commit}) {
        let settings = localStorage.getItem('themeSettings');
        commit(STORE_THEME_SETTINGS, settings);
    },
}

const mutations = {
    [STORE_THEME_SETTINGS](state, update) {
        state.themeSettings = {...state.themeSettings, ...update}
        localStorage.setItem('themeSettings', JSON.stringify(state.themeSettings));
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
