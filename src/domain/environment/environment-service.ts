import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { EnvironmentApi } from "@/constans/api";
import { IEnvironmentService } from "./ienvironment-service";

export class EnvironmentService extends BaseService implements IEnvironmentService {
    updateAppConfiguration(_environmentId: string, _id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${EnvironmentApi.application}/${_environmentId}/${_id}/config`, _param)
    }
    getEnvironmentList(_applicationId: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.application}/${_applicationId}/list`)
    }
    deleteEnvironment(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${EnvironmentApi.application}/${_id}`)
    }
    // getDetail(_id: string): Promise<IServerPageReturn<any>>{
    //     return this.dataRequest.deleteRequest(`${EnvironmentApi.application}/${_id}`)
    // }
    addEnvironment(_param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${EnvironmentApi.application}`, _param);
    }
    getConfigListForEnvironmentId(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.application}/${_id}/config/list`, _param);
    }

    addAppConfiguration(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${EnvironmentApi.application}/${_id}/config`, _param)
    }

    deleteAppConfiguration(_id: string, _config: any): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${EnvironmentApi.application}/${_id}/${_config}/config`)
    }

    getConfigDetail(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.application}/${_id}/config`)
    }
    getConfigRelease(_id: string, _param: any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.application}/${_id}/not/publish/config/list`, _param);
    }
    releasePublish(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${EnvironmentApi.application}/${_id}/publish`, _param)
    }
}
