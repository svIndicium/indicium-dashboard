import apiInstance from "@/assets/js/api";

class StudyTypeService {

    api = apiInstance;

    async getStudyTypes() {
        return await this.api.get("/studytypes");
    }

    async getStudyTypeById(studyTypeId) {
        const response = await this.api.get(`/studytypes/${studyTypeId}`);
        return response.data;
    }

    async createStudyType(studyType) {
        const response = await this.api.post(`/studytypes`, studyType);
        return response.data;
    }
}
export default new StudyTypeService();
