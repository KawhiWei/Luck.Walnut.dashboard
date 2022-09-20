import BaseService from "@/shared/service/BaseService/BaseService";
import { IProjectService } from "./iproject-service";
import { IServerPageReturn } from "@/shared/entity";
import { ProjectApi } from "@/constans/api";

export class ProjectService  extends BaseService implements IProjectService {
    /**
     * 获取分页列表
     */
     getPageList(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ProjectApi.project}/pagelist`,_param)
    }

}
