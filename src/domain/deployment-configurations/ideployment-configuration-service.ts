import { IDeploymentConfigurationDto, IDeploymentConfigurationOutputDto, IDeploymentContainerConfigurationDto, IDeploymentContainerConfigurationOutputDto } from "./deployment-configuration-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IDeploymentConfigurationService {
    /**
     * 获取部署分页列表
     * @param _appId 
     * @param _param 
     */
    getDeploymentConfigurationPageList(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<IDeploymentConfigurationOutputDto>>>;

    /**
     * 删除一个部署
     * @param _id 
     */
    deleteDeploymentConfiguration(_id: string): Promise<IServerReturn<any>>;

    /**
     * 创建一个部署
     * @param _params 
     */
    createDeploymentConfiguration(_params: IDeploymentConfigurationDto): Promise<IServerReturn<any>>;


    /**
     * 根据Id获取一个部署
     * @param _id 
     */
    getDeploymentConfigurationDetail(_id: string): Promise<IServerReturn<IDeploymentConfigurationOutputDto>>;

    /**
     * 修改部署
     * @param _params 
     * @returns 
     */
    updateDeploymentConfiguration(_id: string, _params: IDeploymentConfigurationDto): Promise<IServerReturn<any>>;







    /**
     * 创建一个容器配置
     * @param _params 
     */
    createDeploymentContainerConfiguration(_deploymentId: string, _params: IDeploymentContainerConfigurationDto): Promise<IServerReturn<any>>;

    /**
     * 修改一个容器配置
     * @param _deploymentId 
     * @param _id 
     * @param _params 
     */
    updateDeploymentContainerConfiguration(_deploymentId: string, _id: string, _params: IDeploymentContainerConfigurationDto): Promise<IServerReturn<any>>;


    /**
     * 根据Id获取一个容器配置
     * @param _deploymentConfigurationId 
     * @param _params 
     * @returns 
     */
    getDeploymentContainerConfigurationDetail(_id: string): Promise<IServerReturn<IDeploymentContainerConfigurationOutputDto>>;


    /**
     * 根据部署ID获取一组容器配置
     * @param _deploymentConfigurationId 
     * @param _params 
     * @returns 
     */
    getDeploymentContainerConfigurationListDeploymentId(_deploymentId: string): Promise<IServerReturn<Array<IDeploymentContainerConfigurationOutputDto>>>;

    /**
     * 删除一个容器配置
     * @param _deploymentId 
     * @param _id 
     */
    deleteDeploymentContainerConfiguration(_deploymentId: string, _id: string): Promise<IServerReturn<any>>;
}