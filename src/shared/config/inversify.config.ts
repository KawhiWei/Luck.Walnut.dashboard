import { ApplicationService } from "@/domain/applications/application-service";
import { ComponentIntegrationService } from "@/domain/componentintegration/componentintegration-service";
import { Container } from "inversify";
import { DoveLogService } from "@/domain/logs/dovelog-service";
import { EnvironmentService } from "@/domain/environment/environment-service";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IComponentIntegrationService } from "@/domain/componentintegration/icomponentintegration-service";
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




export default container;