import { ApplicationService } from "@/domain/applications/application-service";
import { Container } from "inversify";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "./ioc-types"

const container = new Container();
container.bind<IApplicationService>(IocTypes.ApplicationService).to(ApplicationService);
export default container;