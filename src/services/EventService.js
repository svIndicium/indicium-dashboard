import apiInstance from "@/assets/js/api";
import axios from "axios";

class EventService {

    api = apiInstance;

    async getEvents() {
        return await axios.get('https://old.indicium.hu/json/events?filter[status]=published&page%5Bsize%5D=1000')
    }

    async getEventById(eventId) {
        const eventResponse = await axios.get(`https://old.indicium.hu/json/events/${eventId}`);
        const res = eventResponse.data.data;
        return {
            id: res.id,
            title: res.attributes.title,
            url: res.attributes.inschrijflink,
            description: this.stripHTMLFromString(res.attributes.contentblocks[0].content),
            image: res.attributes.contentblocks.length > 1 ? res.attributes.contentblocks[1].image.url : null,
            categories: res.attributes.categories,
            start: new Date(res.attributes.start),
            end: new Date(res.attributes.end)
        };
    }

    stripHTMLFromString(str = '') {
        return str.replace(/(<([^>]+)>)/ig, '').replace(/\n|\r/g, ' ').replace('&nbsp;', ' ')
    }
}
export default new EventService();
