import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import { ApplicationPipelineApi } from "@/constans/api";
import BaseService from "@/shared/service/BaseService/BaseService";
import { IApplicationPipelineService } from "./iapplicationpipeline-service";

export class ApplicationPipelineService extends BaseService implements IApplicationPipelineService {
    getBuildLog(_id: string, _buildId: number): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationpipeline}/${_id}/${_buildId}/build/log`)
    }

    update(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ApplicationPipelineApi.applicationpipeline}/${_id}`, _param)
    }

    getDetail(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationpipeline}/${_id}`)
    }

    create(_param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${ApplicationPipelineApi.applicationpipeline}`, _param)
    }

    getPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationpipeline}/${_appId}/page/list`, _param)
    }

    delete(_id: string): Promise<IServerReturn<any>> {

        return this.dataRequest.deleteRequest(`${ApplicationPipelineApi.applicationpipeline}/${_id}`)
    }

    publish(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ApplicationPipelineApi.applicationpipeline}/${_id}/publish`, {})
    }

    executeJob(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${ApplicationPipelineApi.applicationpipeline}/${_id}/execute/job`, {})
    }


}