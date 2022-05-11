import BaseService from "@/shared/service/BaseService/BaseService";
import { EnvironmentApi } from "@/constans/api";
import { IEnvironmentService } from "./ienvironment-service";
import { IServerPageReturn } from "@/shared/entity";

export class EnvironmentService extends BaseService implements IEnvironmentService{
    getEnvironmentList(_applicationId:string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.application}/${_applicationId}/list`)
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

    addConfig(_id: string, _param: any):Promise<IServerPageReturn<any>>{
        return this.dataRequest.postRequest(`${EnvironmentApi.application}/${_id}`,_param)
    }

    delConfig(_id:string, _config:any):Promise<IServerPageReturn<any>>{
        return this.dataRequest.deleteRequest(`${EnvironmentApi.application}/${_id}/${_config}`)
    }

    getConfigDetail(_id:string):Promise<IServerPageReturn<any>>{
        return this.dataRequest.getRequest(`${EnvironmentApi.application}/ConfigurationDetail/${_id}`)
    }
}