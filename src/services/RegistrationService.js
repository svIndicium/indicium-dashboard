import apiInstance from "@/assets/js/api";

class RegistrationService {

    api = apiInstance;

    async getRegistrations() {
        return await this.api.get("/registrations");
    }

    async getRegistrationsById(registrationId) {
        return await this.api.get(`/registrations/${registrationId}`);
    }
}
export default new RegistrationService();
