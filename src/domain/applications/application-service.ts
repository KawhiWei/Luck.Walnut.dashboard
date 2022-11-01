import { ApplicationApi } from "@/constans/api";
import BaseService from "@/shared/service/BaseService/BaseService";
import { IApplicationService } from "./iapplication-service";
import { IServerPageReturn } from "@/shared/entity";

export class ApplicationService extends BaseService implements IApplicationService {
    
    
    getApplicationDashboardDetail(_appId: string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/${_appId}/dashboard`)
    }
    update(_id: string, _param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.putRequest(`${ApplicationApi.application}/${_id}`, _param)
    }
    getDetail(_id: string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/${_id}`)
    }
    addApplication(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.postRequest(`${ApplicationApi.application}`, _param)
    }
    getPage(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/Page`, _param)
    }

    delete(_id: string): Promise<IServerPageReturn<any>> {

        return this.dataRequest.deleteRequest(`${ApplicationApi.application}/${_id}`)
    }

    getApplicationEnumList(): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/enum/list`, )
    }

    getLanguageList(): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/language/list`, )
    }
}