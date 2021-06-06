import apiInstance from "@/assets/js/api";

class RegistrationService {

    api = apiInstance;

    async getRegistrations() {
        return await this.api.get("/registrations");
    }

    async getRegistrationsById(registrationId) {
        const response = await this.api.get(`/registrations/${registrationId}`);
        return response.data;
    }
}
export default new RegistrationService();
