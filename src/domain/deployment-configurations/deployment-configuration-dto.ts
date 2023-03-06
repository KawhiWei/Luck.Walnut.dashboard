import { IEntity } from "@/shared/entity";

/**
 * 应用部署配置Dto
 */
export interface IDeploymentConfigurationBaseDto {
    /**
     * 部署环境
     */
    environmentName: string;
    /**
     * 应用运行时类型
     */
    applicationRuntimeType: number;
    /**
     * 部署类型
     */
    deploymentType: number;
    /**
     * 中文名称
     */
    chineseName: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 应用Id
     */
    appId: string;
    /**
     * 命名空间Id
     */
    kubernetesNameSpaceId: string;
    /**
     * 部署副本数量
     */
    replicas: number;
    /**
     * 最大不可用
     */
    maxUnavailable: number;
    /**
     * 镜像拉取证书
     */
    imagePullSecretId: string;
}

/**
 * 输出Dto
 */
export interface IDeploymentConfigurationOutputDto extends IDeploymentConfigurationBaseDto, IEntity<string> {
    /**
     * 应用容器配置列表
     */
    applicationContainers: IContainerConfigurationOutputDto[];
}

/**
 * 容器配置基础Dto
 */
export interface IContainerConfigurationBase {
    /**
     * 容器名称
     */
    containerName: string;
    /**
     * 重启策略
     */
    restartPolicy: string;
    /**
     * 是否初始容器
     */
    isInitContainer: boolean;
    /**
     * 镜像拉取策略
     */
    imagePullPolicy: string;
    /**
     * 镜像名称
     */
    image?: string;
    /**
     * 准备完成探针配置
     */
    readinessProbe?: INessProbe;
    /**
     * 存活探针配置
     */
    liveNessProbe?: INessProbe;
    /**
     * 容器Cpu资源限制
     */
    requests?: IContainerResourceQuantity;

    /**
     * 容器内存资源限制
     */
    limits?: IContainerResourceQuantity;
    /**
     * 环境变量
     */
    environments?: Object;
    /**
     * 容器端口配置
     */
    containerPortConfigurations?: IContainerPortConfiguration[];
}


/**
 * 容器资源配置
 */
export interface IContainerResourceQuantity {
    /**
     * 
     */
    memory: string;
    /**
     * 
     */
    cpu: string;
}

/**
 * 端口配置
 */
export interface IContainerPortConfiguration {
    /**
     * 端口名称
     */
    name: string;
    /**
     * 容器端口
     */
    containerPort: number;
    /**
     * 端口协议
     */
    protocol: string;
}


/**
 * 健康检查端口配置
 */
export interface INessProbe {
    /**
     * 
     */
    scheme: string;
    /**
     * 
     */
    path: string;
    /**
     * 端口
     */
    port: number;
    /**
     * 
     * 
     */
    initialDelaySeconds: number;
    /**
     * 
     */
    periodSeconds: number;
}


/**
 * 容器输出Dto
 */
export interface IContainerConfigurationOutputDto extends IContainerConfigurationBase, IEntity<string> {

}

/**
 * 容器输出Dto
 */
export interface IContainerConfigurationDto extends IContainerConfigurationBase{

}