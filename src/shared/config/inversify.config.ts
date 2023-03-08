import { ApplicationPipelineService } from "@/domain/applicationpipelines/applicationpipeline-service";
import { ApplicationService } from "@/domain/applications/application-service";
import { BuildImageService } from "@/domain/buildimages/buildimage-service";
import { ClusterService } from "@/domain/kubernetes/clusters/cluster-service";
import { ComponentIntegrationService } from "@/domain/componentintegration/componentintegration-service";
import { Container } from "inversify";
import DeploymentConfigurationService from "@/domain/deployment-configurations/deployment-configuration-service";
import { DoveLogService } from "@/domain/logs/dovelog-service";
import { EnvironmentService } from "@/domain/environment/environment-service";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IBuildImageService } from "@/domain/buildimages/ibuildimage-service";
import { IClusterService } from "@/domain/kubernetes/clusters/icluster-service";
import { IComponentIntegrationService } from "@/domain/componentintegration/icomponentintegration-service";
import { IDeploymentConfigurationService } from "@/domain/deployment-configurations/ideployment-configuration-service";
import { IDoveLogService } from "@/domain/logs/idovelog-service";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IMatterService } from "@/domain/matters/imatter-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "./ioc-types"
import { MatterService } from "@/domain/matters/matter-service";
import { ProjectService } from "@/domain/projects/project-service";

const container = new Container();
container.bind<IApplicationService>(IocTypes.ApplicationService).to(ApplicationService);
container.bind<IEnvironmentService>(IocTypes.EnvironmentService).to(EnvironmentService);
container.bind<IDoveLogService>(IocTypes.DoveLogService).to(DoveLogService);
container.bind<IMatterService>(IocTypes.MatterService).to(MatterService);
container.bind<IProjectService>(IocTypes.ProjectService).to(ProjectService);
container.bind<IComponentIntegrationService>(IocTypes.ComponentIntegrationService).to(ComponentIntegrationService);
container.bind<IApplicationPipelineService>(IocTypes.ApplicationPipelineService).to(ApplicationPipelineService);
container.bind<IBuildImageService>(IocTypes.BuildImageService).to(BuildImageService);
container.bind<IClusterService>(IocTypes.ClusterService).to(ClusterService);
container.bind<IDeploymentConfigurationService>(IocTypes.DeploymentConfigurationService).to(DeploymentConfigurationService);





export default container;