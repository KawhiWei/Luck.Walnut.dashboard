import { IEntity } from "@/shared/entity";

export interface IApplicationDeploymentBaseDto {
    environmentName:        string;
    applicationRuntimeType: number;
    deploymentType:         number;
    chineseName:            string;
    name:                   string;
    appId:                  string;
    kubernetesNameSpaceId:  string;
    replicas:               number;
    maxUnavailable:         number;
    imagePullSecretId:      string;
}



export interface IApplicationDeploymentOutputDto extends IApplicationDeploymentBaseDto,IEntity<string> {

}