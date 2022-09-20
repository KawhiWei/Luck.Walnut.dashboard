import BaseService from "@/shared/service/BaseService/BaseService";
import { IMatterService } from "./imatter-service";
import { IServerPageReturn } from "@/shared/entity";
import { MatterApi } from "@/constans/api";

export class MatterService extends BaseService implements IMatterService {
    addMatter(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.postRequest(`${MatterApi.matter}`,_param)
    }
    deleteEnvironment(_id: string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.deleteRequest(`${MatterApi.matter}/${_id}`)
    }
    updateAppConfiguration(_id: string, _param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.putRequest(`${MatterApi.matter}`,_param)
    }
    getDetail(_id: string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${MatterApi.matter}/${_id}`)
    }
    getMatterList(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${MatterApi.matter}/pagelist`)
    }




}