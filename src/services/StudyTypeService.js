import apiInstance from "@/assets/js/api";

class StudyTypeService {

    api = apiInstance;

    async getStudyTypes() {
        return await this.api.get("/studytypes");
    }

    async getStudyTypeById(studyTypeId) {
        return await this.api.get(`/studytypes/${studyTypeId}`);
    }
}
export default new StudyTypeService();
