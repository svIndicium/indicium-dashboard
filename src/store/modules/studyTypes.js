import {StudyTypeService} from "@/services";
import {STORE_STUDY_TYPES} from "@/store/mutations";
import {FETCH_STUDY_TYPES} from "@/store/actions";

const state = {
    studyTypes: [],
    studyTypesLength: 0,
    isLoading: true,
}

const getters = {
    studyTypes(state) {
        return state.studyTypes;
    },
    studyTypesLength(state) {
        return state.studyTypesLength;
    },
    studyTypeById: (state) => (studyTypeId) => {
        return state.studyTypes.find((studyType) => studyType.id === studyTypeId);
    }
}

const actions = {
    async [FETCH_STUDY_TYPES]({commit}) {
        const studyTypesResponse = await StudyTypeService.getStudyTypes();
        commit(STORE_STUDY_TYPES, studyTypesResponse.data);
    }
}

const mutations = {
    [STORE_STUDY_TYPES](state, studyTypes) {
        state.studyTypes = studyTypes;
        state.studyTypesLength = studyTypes.length;
        state.isLoading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
