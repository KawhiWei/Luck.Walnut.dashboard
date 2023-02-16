import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import { IDeploymentConfigurationOutputDto } from "./deployment-configuration-dto";

export interface IDeploymentConfigurationService {
    getPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<IDeploymentConfigurationOutputDto>>>;
}