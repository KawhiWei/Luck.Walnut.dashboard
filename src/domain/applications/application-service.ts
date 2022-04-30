import { ApplicationApi } from "@/constans/api";
import BaseService from "@/shared/service/BaseService/BaseService";
import { IApplicationService } from "./iapplication-service";
import { IServerPageReturn } from "@/shared/entity";

export class ApplicationService extends BaseService implements IApplicationService {
    gettable(): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}`)
    }


}