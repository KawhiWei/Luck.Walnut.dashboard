import { IContainerConfigurationDto, IDeploymentConfigurationDto, IDeploymentConfigurationOutputDto } from "./deployment-configuration-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IDeploymentConfigurationService {
    /**
     * 获取部署分页列表
     * @param _appId 
     * @param _param 
     */
    getPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<IDeploymentConfigurationOutputDto>>>;

    /**
     * 删除一个部署
     * @param _id 
     */
    delete(_id: string): Promise<IServerReturn<any>>;

    /**
     * 创建一个部署
     * @param _params 
     */
    createDeploymentConfiguration(_params: IDeploymentConfigurationDto): Promise<IServerReturn<any>>;
}