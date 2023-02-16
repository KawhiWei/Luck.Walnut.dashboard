import BaseService from "@/shared/service/BaseService/BaseService";
import { IClusterService } from "./icluster-service";
import { IServerReturn } from "@/shared/entity";
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
     * 
     * @param _id 
     * @returns 
     */
    getClusterDashboard(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${KubernetesApi.cluster}/${_id}/cluster/resource/dashboard`);
    }


}