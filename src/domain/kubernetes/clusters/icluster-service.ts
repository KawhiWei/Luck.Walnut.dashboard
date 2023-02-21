import { IServerReturn } from "@/shared/entity";
import { KubernetesClusterDashboardDto } from "./kubernetes-cluster-dto";

export interface IClusterService {
    /**
     * 集群控制面板信息
     * @param _id 
     */
    getClusterDashboard(_id:string) :Promise<IServerReturn<KubernetesClusterDashboardDto>>;
    
    getClusterList() :Promise<IServerReturn<any>>;
}