import { IEntity } from "@/shared/entity";

export interface IDeploymentConfigurationBaseDto {
    environmentName: string;
    applicationRuntimeType: number;
    deploymentType: number;
    chineseName: string;
    name: string;
    appId: string;
    kubernetesNameSpaceId: string;
    replicas: number;
    maxUnavailable: number;
    imagePullSecretId: string;
}



export interface IDeploymentConfigurationOutputDto extends IDeploymentConfigurationBaseDto, IEntity<string> {

}