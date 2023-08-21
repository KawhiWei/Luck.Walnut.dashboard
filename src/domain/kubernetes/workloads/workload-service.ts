import { IDeploymentConfigurationOutputDto, IDeploymentInputDto, IDeploymentOutputDto, IMasterContainerConfigurationInputDto, IMasterContainerConfigurationOutputDto, IWorkLoadInputDto } from "./workload-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { IWorkLoadService } from "./iworkload-service";
import { DeploymentApi as WorkLoad } from "@/constans/api";

export default class WorkLoadService extends BaseService implements IWorkLoadService {

    /**
     * 获取部署分页列表
     * @param _appId 
     * @param _param 
     * @returns 
     */
    getWorkLoadPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<IDeploymentConfigurationOutputDto>>> {
        return this.dataRequest.getRequest(`${WorkLoad.workloads}/${_appId}/page/list`, _param);
    }

    /**
     * 删除一个部署
     * @param _id 
     * @returns 
     */
    deleteWorkLoad(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${WorkLoad.workloads}/${_id}`)
    }
    /**
     * 创建部署
     * @param _params 
     * @returns 
     */
    createWorkLoad(_params: IWorkLoadInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${WorkLoad.workloads}`, _params)
    }

    /**
     * 修改部署
     * @param _params 
     * @returns 
     */
    updateWorkLoad(_deploymentId: string, _masterContainerId: string, _params: IDeploymentInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${WorkLoad.workloads}/${_deploymentId}/${_masterContainerId}`, _params)
    }


    /**
     * 根据Id获取一个部署
     * @param _params 
     * @returns 
     */
    getWorkLoadDetail(_deploymentId: string): Promise<IServerReturn<IDeploymentOutputDto>> {
        return this.dataRequest.getRequest(`${WorkLoad.workloads}/${_deploymentId}/`)
    }
    /**
     * 根据应用Id获取部署列表
     * @param _appId 
     * @param _param 
     * @returns 
     */
    getWorkLoadByAppIdList(_appId: string): Promise<IServerReturn<Array<IDeploymentConfigurationOutputDto>>> {
        return this.dataRequest.getRequest(`${WorkLoad.workloads}/${_appId}/list`);
    }








    /**
     * 创建一个容器配置
     * @param _deploymentId 
     * @param _params 
     * @returns 
     */
    createDeploymentContainerConfiguration(_deploymentId: string, _params: IMasterContainerConfigurationInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${WorkLoad.workloads}/${_deploymentId}/container`, _params)
    }


    /**
     * 修改一个容器配置
     * @param _deploymentId 
     * @param _params 
     * @returns 
     */
    updateDeploymentContainerConfiguration(_deploymentId: string, _id: string, _params: IMasterContainerConfigurationInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${WorkLoad.workloads}/${_deploymentId}/${_id}/container`, _params)
    }


    /**
     * 根据Id获取一个容器配置
     * @param _deploymentConfigurationId 
     * @param _params 
     * @returns 
     */
    getDeploymentContainerConfigurationDetail(_id: string): Promise<IServerReturn<IMasterContainerConfigurationOutputDto>> {
        return this.dataRequest.getRequest(`${WorkLoad.workloads}/${_id}/container`)
    }


    /**
     * 根据部署Id获取一组容器配置
     * @param _deploymentId 
     * @returns 
     */
    getDeploymentContainerConfigurationListDeploymentId(_deploymentId: string): Promise<IServerReturn<IMasterContainerConfigurationOutputDto[]>> {
        return this.dataRequest.getRequest(`${WorkLoad.workloads}/${_deploymentId}/container/list`)
    }


    /**
     * 删除一个容器配置
     * @param _deploymentId 
     * @param _id 
     */
    deleteDeploymentContainerConfiguration(_deploymentId: string, _id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${WorkLoad.workloads}/${_deploymentId}/${_id}/container`)
    }

}

