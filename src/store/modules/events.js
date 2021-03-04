import {EventService} from "@/services";
import {STORE_EVENTS} from "@/store/mutations";
import {FETCH_EVENTS} from "@/store/actions";

const mapEvent = (event) => ({
    id: event.id,
    title: event.attributes.title,
    description: stripHTMLFromString(event.attributes.contentblocks[0].content),
    startDate: new Date(event.attributes.start).getTime(),
    endDate: new Date(event.attributes.end).getTime(),
    url: `/activiteiten/${event.id}-${event.attributes.slug}`,
    categories: event.attributes.categories
});


const stripHTMLFromString = (str = '') => {
    return str.replace(/(<([^>]+)>)/ig, '').replace(/\n|\r/g, ' ').replace('&nbsp;', ' ')
}

const state = {
    events: [],
    eventsLength: 0,
    isLoading: true,
}

const getters = {
    events(state) {
        return state.events;
    },
    eventsLength(state) {
        return state.eventsLength;
    }
}

const actions = {
    async [FETCH_EVENTS]({commit}) {
        const eventsResponse = await EventService.getEvents();
        const events = eventsResponse.data.data
            .sort((eventA, eventB) => new Date(eventA.attributes.start) - new Date(eventB.attributes.start))
            .map(mapEvent);
        commit(STORE_EVENTS, events);
    }
}

const mutations = {
    [STORE_EVENTS](state, events) {
        state.events = events;
        state.eventsLength = events.length;
        state.isLoading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
