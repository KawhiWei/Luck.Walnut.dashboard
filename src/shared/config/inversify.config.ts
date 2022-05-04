import { ApplicationService } from "@/domain/applications/application-service";
import { Container } from "inversify";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "./ioc-types"
import { EnvironmentService } from "@/domain/environment/environment-service";
import { IEnvironmentService } from "@/domain/environment/Ienvironment-service";


const container = new Container();
container.bind<IApplicationService>(IocTypes.ApplicationService).to(ApplicationService);
container.bind<IEnvironmentService>(IocTypes.EnvironmentService).to(EnvironmentService);
export default container;