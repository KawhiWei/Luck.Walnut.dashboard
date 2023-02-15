import { IServerPageReturn, IServerReturn } from "@/shared/entity";
import {IApplicationDeploymentOutputDto} from "./applicationdeployment-dto";
import { IApplicationDeploymentService } from "./iapplicationdeployment-service";
import BaseService from "@/shared/service/BaseService/BaseService";
import { DeploymentApi } from "@/constans/api";

export class ApplicationDeploymentService extends BaseService implements IApplicationDeploymentService{
    getPage(_appId:string, _param:any):Promise<IServerReturn<IServerPageReturn<IApplicationDeploymentOutputDto>>>{
        return this.dataRequest.getRequest(`${DeploymentApi.deployments}/${_appId}/page/list`, _param);
    }
}