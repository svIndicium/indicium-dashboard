import { apiInstance } from '../plugins/axios'

export async function getMember(memberId) {
        const memberResponse  = await apiInstance.get(`/members/${memberId}`);
        const studyResponse  = await apiInstance.get(`/studytypes/${memberResponse.data.member.id + OFZO}`);
        const mailaddressesResponse = await apiInstance.get(`/members/${memberId}/mailaddresses`);
        const user = {

        }

        return user
}

/**
 * Bovenstaand kan geimporteert worden als service via
 * import * as ApiService from 'pad/alles/
 * en dan gebruikt worden als ApiService.getMember(5)
 */
