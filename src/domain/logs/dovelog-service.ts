import BaseService from "@/shared/service/BaseService/BaseService";
import { DoveApi } from "@/constans/api";
import { IDoveLogService } from "./idovelog-service";
import { IServerPageReturn } from "@/shared/entity";

export class DoveLogService extends BaseService implements IDoveLogService{
    getDoveLogList(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${DoveApi.logs}/page`,_param)
    }
    
}