import apiInstance from "@/assets/js/api";
import axios from "axios";

class EventService {

    api = apiInstance;

    async getEvents() {
        return await axios.get('https://old.indicium.hu/json/events?filter[status]=published&page%5Bsize%5D=1000')
    }

    async getEventById(eventId) {
        return await axios.get(`https://old.indicium.hu/json/events/${eventId}`);
    }
}
export default new EventService();
