import { IDeploymentConfigurationDto, IDeploymentConfigurationOutputDto, IDeploymentContainerConfigurationDto, IDeploymentContainerConfigurationOutputDto } from "./deployment-configuration-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { DeploymentApi } from "@/constans/api";
import { IDeploymentConfigurationService } from "./ideployment-configuration-service";

export default class DeploymentConfigurationService extends BaseService implements IDeploymentConfigurationService {

    /**
     * 获取部署分页列表
     * @param _appId 
     * @param _param 
     * @returns 
     */
    getDeploymentConfigurationPageList(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<IDeploymentConfigurationOutputDto>>> {
        return this.dataRequest.getRequest(`${DeploymentApi.deployments}/${_appId}/page/list`, _param);
    }

    /**
     * 删除一个部署
     * @param _id 
     * @returns 
     */
    deleteDeploymentConfiguration(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${DeploymentApi.deployments}/${_id}`)
    }
    /**
     * 创建部署
     * @param _params 
     * @returns 
     */
    createDeploymentConfiguration(_params: IDeploymentConfigurationDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${DeploymentApi.deployments}`, _params)
    }

    /**
     * 修改部署
     * @param _params 
     * @returns 
     */
    updateDeploymentConfiguration(_id: string, _params: IDeploymentConfigurationDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${DeploymentApi.deployments}`, _params)
    }

    /**
     * 根据Id获取一个部署
     * @param _params 
     * @returns 
     */
    getDeploymentConfigurationDetail(_id: string): Promise<IServerReturn<IDeploymentConfigurationOutputDto>> {
        return this.dataRequest.getRequest(`${DeploymentApi.deployments}/${_id}`)
    }








    /**
     * 创建一个容器配置
     * @param _deploymentId 
     * @param _params 
     * @returns 
     */
    createDeploymentContainerConfiguration(_deploymentId: string, _params: IDeploymentContainerConfigurationDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${DeploymentApi.deployments}/${_deploymentId}/container`, _params)
    }


    /**
     * 修改一个容器配置
     * @param _deploymentId 
     * @param _params 
     * @returns 
     */
    updateDeploymentContainerConfiguration(_deploymentId: string, _id: string, _params: IDeploymentContainerConfigurationDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${DeploymentApi.deployments}/${_deploymentId}/${_id}/container`, _params)
    }


    /**
     * 根据Id获取一个容器配置
     * @param _deploymentConfigurationId 
     * @param _params 
     * @returns 
     */
    getDeploymentContainerConfigurationDetail(_id: string): Promise<IServerReturn<IDeploymentContainerConfigurationOutputDto>> {
        return this.dataRequest.getRequest(`${DeploymentApi.deployments}/${_id}/container`)
    }


    /**
     * 根据部署Id获取一组容器配置
     * @param _deploymentId 
     * @returns 
     */
    getDeploymentContainerConfigurationListDeploymentId(_deploymentId: string): Promise<IServerReturn<IDeploymentContainerConfigurationOutputDto[]>> {
        return this.dataRequest.getRequest(`${DeploymentApi.deployments}/${_deploymentId}/container/list`)
    }


    /**
     * 删除一个容器配置
     * @param _deploymentId 
     * @param _id 
     */
    deleteDeploymentContainerConfiguration(_deploymentId: string, _id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${DeploymentApi.deployments}/${_deploymentId}/${_id}/container`)
    }

}

