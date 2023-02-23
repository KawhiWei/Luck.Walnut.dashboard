import { IEntity } from "@/shared/entity";

/**
 * 应用部署配置Dto
 */
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

/**
 * 输出Dto
 */
export interface IDeploymentConfigurationOutputDto extends IDeploymentConfigurationBaseDto, IEntity<string> {
    applicationContainers: IApplicationContainerOutputDto[];
}

/**
 * 容器配置基础Dto
 */
export interface IApplicationContainerBase {
    containerName: string;
    restartPolicy: string;
    isInitContainer: boolean;
    imagePullPolicy: string;
    image: string;
    readinessProbe: INessProbe;
    liveNessProbe: INessProbe;
    cpuContainerResourceQuantity: IContainerResourceQuantity;
    memoryContainerResourceQuantity: IContainerResourceQuantity;
    environments: Map<Object, Object>;
    containerPortConfigurations: IContainerPortConfiguration[];
}

/**
 * 端口配置
 */
export interface IContainerPortConfiguration {
    name: string;
    containerPort: number;
    protocol: string;
}
/**
 * 容器资源配置
 */
export interface IContainerResourceQuantity {
    limit: string;
    request: string;
}

/**
 * 健康检查端口配置
 */
export interface INessProbe {
    scheme: string;
    path: string;
    port: number;
    initialDelaySeconds: number;
    periodSeconds: number;
}


/**
 * 容器输出Dto
 */
export interface IApplicationContainerOutputDto extends IApplicationContainerBase, IEntity<string> {

}