import apiInstance from "@/assets/js/api";

class SettingService {

    api = apiInstance;

    async getSetting(service, setting) {
        const response = await this.api.get(`/settings/${service}/${setting}`);
        return response.data;
    }

    async updateSetting(service, setting, value) {
        const response = await this.api.post(`/settings/${service}/${setting}`, {value});
        return response.data;
    }
}
export default new SettingService();
