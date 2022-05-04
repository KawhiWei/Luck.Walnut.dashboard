import { EnvironmentApi } from "@/constans/api";
import BaseService from "@/shared/service/BaseService/BaseService";
import { IServerPageReturn } from "@/shared/entity";
import { IEnvironmentService } from "./Ienvironment-service";


export class EnvironmentService extends BaseService implements IEnvironmentService{
    getTable(): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.application}/getenvironmentlist`)
    }
}