import { ApplicationService } from "@/domain/applications/application-service";
import { Container } from "inversify";
import { DoveLogService } from "@/domain/logs/dovelog-service";
import { EnvironmentService } from "@/domain/environment/environment-service";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IDoveLogService } from "@/domain/logs/idovelog-service";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "./ioc-types"

const container = new Container();
container.bind<IApplicationService>(IocTypes.ApplicationService).to(ApplicationService);
container.bind<IEnvironmentService>(IocTypes.EnvironmentService).to(EnvironmentService);
container.bind<IDoveLogService>(IocTypes.DoveLogService).to(DoveLogService);
export default container;