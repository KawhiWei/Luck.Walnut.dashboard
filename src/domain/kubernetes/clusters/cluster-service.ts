import { IClusterInputDto, IClusterOutputDto, } from "./cluster-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { IClusterService } from "./icluster-service";
import { INameSpaceOutputDto } from "@/domain/kubernetes/namespaces/namespace-dto";
import { KubernetesApi } from "@/constans/api";
import { KubernetesClusterDashboardDto } from "./kubernetes-cluster-dto";

export class ClusterService extends BaseService implements IClusterService {

    /**
     * 获取集群列表
     * @returns 
     */
    getClusterList(): Promise<IServerReturn<KubernetesClusterDashboardDto>> {
        return this.dataRequest.getRequest(`${KubernetesApi.cluster}/list`);
    }
    /**
     * 分页获取集群列表
     * @returns 
     */
    getClusterPageList(_param:any): Promise<IServerReturn<IServerPageReturn<IClusterOutputDto>>> {
        return this.dataRequest.getRequest(`${KubernetesApi.cluster}/page/list`,_param);
    }
    /**
     * 
     * @param _id 
     * @returns 
     */
    getClusterDashboard(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${KubernetesApi.cluster}/${_id}/cluster/resource/dashboard`);
    }

    /**
     * 创建集群
     * @returns 
     */
    createCluster(_params: IClusterInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${KubernetesApi.cluster}`, _params);
    }

    /**
     * 修改集群
     * @returns 
     */
    updateCluster(_id: string, _params: IClusterInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${KubernetesApi.cluster}/${_id}`, _params);
    }

    /**
     * 删除集群
     * @returns 
     */
    deleteCluster(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${KubernetesApi.cluster}/${_id}`);
    }

    /**
     * 获取一个集群信息
     * @returns 
     */
    getClusterDetail(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${KubernetesApi.cluster}/${_id}`);
    }
}