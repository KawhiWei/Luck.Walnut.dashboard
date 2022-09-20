import BaseService from "@/shared/service/BaseService/BaseService";
import { IServerPageReturn } from "@/shared/entity";
export interface IProjectService {
    /**
     * 获取分页列表
     */
    getPageList(_param: any): Promise<IServerPageReturn<any>>;

}
