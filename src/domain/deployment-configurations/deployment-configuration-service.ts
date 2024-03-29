import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { DeploymentApi } from "@/constans/api";
import { IDeploymentConfigurationOutputDto } from "./deployment-configuration-dto";
import { IDeploymentConfigurationService } from "./ideployment-configuration-service";

export class DeploymentConfigurationService extends BaseService implements IDeploymentConfigurationService {
    getPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<IDeploymentConfigurationOutputDto>>> {
        return this.dataRequest.getRequest(`${DeploymentApi.deployments}/${_appId}/page/list`, _param);
    }
    delete(_id:string): Promise<IServerReturn<any>>{
        return this.dataRequest.deleteRequest(`${DeploymentApi.deployments}/${_id}`)
    }
}

