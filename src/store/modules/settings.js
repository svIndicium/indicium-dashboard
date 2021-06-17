import {StudyTypeService} from "@/services";
import {STORE_SETTING, STORE_STUDY_TYPES} from "@/store/mutations";
import {FETCH_SETTING, FETCH_STUDY_TYPES, RESET_STATE} from "@/store/actions";
import SettingService from "@/services/SettingService";


const getDefaultState = () => {
    return {
        settings: {
            payments: {
                MOLLIE_API_KEY: {},
                MOLLIE_WEBHOOK_URL: {},
            }
        }
    }
}

const state = getDefaultState();

const getters = {
}

const actions = {
    async [FETCH_SETTING]({commit}, {service, setting}) {
        const settingResponse = await SettingService.getSetting(service, setting);
        commit(STORE_SETTING, {service, setting: settingResponse});
    },
    [RESET_STATE](state) {
        Object.assign(state, getDefaultState())
    },
}

const mutations = {
    [STORE_SETTING](state, {service, setting}) {
        state.settings[service][setting.key] = setting
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
