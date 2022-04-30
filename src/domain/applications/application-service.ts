import { ApplicationApi } from "@/constans/api";
import BaseService from "@/shared/service/BaseService/BaseService";
import { IApplicationService } from "./iapplication-service";
import { IServerPageReturn } from "@/shared/entity";

export class ApplicationService extends BaseService implements IApplicationService {
    addApplication(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.postRequest(`${ApplicationApi.application}`,_param)
    }
    gettable(): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}`)
    }

    delete(_id: string): Promise<IServerPageReturn<any>> {
        
        return this.dataRequest.deleteRequest(`${ApplicationApi.application}/${_id}`)
      }
}