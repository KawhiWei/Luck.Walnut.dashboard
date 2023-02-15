import { IServerPageReturn, IServerReturn } from "@/shared/entity";
import {IApplicationDeploymentOutputDto} from "./applicationdeployment-dto";

export interface IApplicationDeploymentService {
    getPage(_appId:string, _param:any):Promise<IServerReturn<IServerPageReturn<IApplicationDeploymentOutputDto>>>;
}