import BaseService from "@/shared/service/BaseService/BaseService";
import { EnvironmentApi } from "@/constans/api";
import { IEnvironmentService } from "./ienvironment-service";
import { IServerPageReturn } from "@/shared/entity";

export class EnvironmentService extends BaseService implements IEnvironmentService{
    getList(): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.application}`)
    }
    delete(_id:string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.deleteRequest(`${EnvironmentApi.application}/${_id}`)
    }
    // getDetail(_id: string): Promise<IServerPageReturn<any>>{
    //     return this.dataRequest.deleteRequest(`${EnvironmentApi.application}/${_id}`)
    // }
    add(_param: any): Promise<IServerPageReturn<any>>{
        return this.dataRequest.postRequest(`${EnvironmentApi.application}`,_param);
    }
    getTable(_id: string):Promise<IServerPageReturn<any>>{
        return this.dataRequest.getRequest(`${EnvironmentApi.application}/${_id}`);
    }


}