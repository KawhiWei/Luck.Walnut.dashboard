import { ApplicationRuntimeTypeEnum, DeploymentTypeEnum } from "../deployment-configurations/deployment-configuration-enum";

export const ApplicationRuntimeTypeMap = [
    {
        key: ApplicationRuntimeTypeEnum.kubernetes,
        value: "Kubernetes",
    }
]

export const DeploymentTypeMap = [
    {
        key: DeploymentTypeEnum.pod,
        value: "Pod",
    },
    {
        key: DeploymentTypeEnum.deployment,
        value: "Deployment",
    },
    {
        key: DeploymentTypeEnum.daemonSet,
        value: "DaemonSet",
    },
    {
        key: DeploymentTypeEnum.statefulSet,
        value: "StatefulSet",
    },
    {
        key: DeploymentTypeEnum.replicaSet,
        value: "ReplicaSet",
    },
    {
        key: DeploymentTypeEnum.job,
        value: "Job",
    },
    {
        key: DeploymentTypeEnum.cronJob,
        value: "CronJob",
    },
]