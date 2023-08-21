import { IDeploymentConfigurationOutputDto, IDeploymentInputDto, IDeploymentOutputDto, IMasterContainerConfigurationInputDto, IMasterContainerConfigurationOutputDto, IWorkLoadInputDto } from "./workload-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IWorkLoadService {
    /**
     * 获取部署分页列表
     * @param _appId 
     * @param _param 
     */
    getWorkLoadPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<IDeploymentConfigurationOutputDto>>>;

    /**
     * 删除一个部署
     * @param _id 
     */
    deleteWorkLoad(_id: string): Promise<IServerReturn<any>>;

    /**
     * 创建一个部署
     * @param _params 
     */
    createWorkLoad(_params: IWorkLoadInputDto): Promise<IServerReturn<any>>;


    /**
     * 根据Id获取一个部署
     * @param _id 
     */
    getWorkLoadDetail(_deploymentId: string): Promise<IServerReturn<IDeploymentOutputDto>>;

    /**
     * 
     * @param _deploymentId 
     * @param _masterContainerId 
     * @param _params 
     */
    updateWorkLoad(_deploymentId: string, _masterContainerId: string, _params: IDeploymentInputDto): Promise<IServerReturn<any>>;

    /**
         * 根据应用Id获取部署列表
         * @param _appId 
         * @param _param 
         * @returns 
         */
    getWorkLoadByAppIdList(_appId: string): Promise<IServerReturn<Array<IDeploymentConfigurationOutputDto>>>;


    /**
     * 修改一个容器配置
     * @param _deploymentId 
     * @param _id 
     * @param _params 
     */
    updateDeploymentContainerConfiguration(_deploymentId: string, _id: string, _params: IMasterContainerConfigurationInputDto): Promise<IServerReturn<any>>;


    /**
     * 根据Id获取一个容器配置
     * @param _deploymentConfigurationId 
     * @param _params 
     * @returns 
     */
    getDeploymentContainerConfigurationDetail(_id: string): Promise<IServerReturn<IMasterContainerConfigurationOutputDto>>;


    /**
     * 根据部署ID获取一组容器配置
     * @param _deploymentConfigurationId 
     * @param _params 
     * @returns 
     */
    getDeploymentContainerConfigurationListDeploymentId(_deploymentId: string): Promise<IServerReturn<Array<IMasterContainerConfigurationOutputDto>>>;

    /**
     * 删除一个容器配置
     * @param _deploymentId 
     * @param _id 
     */
    deleteDeploymentContainerConfiguration(_deploymentId: string, _id: string): Promise<IServerReturn<any>>;
}