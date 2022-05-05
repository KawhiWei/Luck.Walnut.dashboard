import BaseService from "@/shared/service/BaseService/BaseService";
import { EnvironmentApi } from "@/constans/api";
import { IEnvironmentService } from "./ienvironment-service";
import { IServerPageReturn } from "@/shared/entity";

export class EnvironmentService extends BaseService implements IEnvironmentService{
    getTable(): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.application}/getenvironmentlist`)
    }
}