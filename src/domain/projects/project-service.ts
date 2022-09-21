import BaseService from "@/shared/service/BaseService/BaseService";
import { IProjectService } from "./iproject-service";
import { IServerPageReturn } from "@/shared/entity";
import { ProjectApi } from "@/constans/api";

export class ProjectService extends BaseService implements IProjectService {
    /**
     * 获取分页列表
     */
    getPageList(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ProjectApi.project}/pagelist`, _param)
    }

    /**
     * 获取枚举列表
     */
    getEnumList(): Promise<IServerPageReturn<any>> {
        return this.dataRequest.getRequest(`${ProjectApi.project}/enumlist`)
    }

    /**
     * 创建项目
     */
    create(_param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.postRequest(`${ProjectApi.project}`, _param)
    }

    /**
    * 修改项目
    */
    update(_id: string, _param: any): Promise<IServerPageReturn<any>> {
        return this.dataRequest.putRequest(`${ProjectApi.project}/${_id}`, _param)
    }

    /**
    * 修改项目
    */
    delete(_id: string): Promise<IServerPageReturn<any>> {
        return this.dataRequest.deleteRequest(`${ProjectApi.project}/${_id}`)
    }
}
