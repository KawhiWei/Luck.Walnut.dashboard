import { ApplicationPipelineApi } from "@/constans/api";
import BaseService from "@/shared/service/BaseService/BaseService";
import { IApplicationPipelineService } from "./iapplicationpipeline-service";
import { IServerPageReturn } from "@/shared/entity";

export class ApplicationPipelineService extends BaseService implements IApplicationPipelineService {

    update(_id: string, _param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.putRequest(`${ApplicationPipelineApi.applicationpipeline}/${_id}`, _param)
    }

    getDetail(_id: string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationpipeline}/${_id}`)
    }

    create(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.postRequest(`${ApplicationPipelineApi.applicationpipeline}`, _param)
    }

    getPage(_appId: string, _param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationpipeline}/${_appId}/page/list`, _param)
    }

    delete(_id: string): Promise<IServerPageReturn<any>> {

        return this.dataRequest.deleteRequest(`${ApplicationPipelineApi.applicationpipeline}/${_id}`)
    }

    getApplicationEnumList(): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationpipeline}/enum/list`,)
    }
}