import BaseService from "@/shared/service/BaseService/BaseService";
import { IServerPageReturn } from "@/shared/entity";
export interface IProjectService {
    /**
     * 获取分页列表
     */
    getPageList(_param: any): Promise<IServerPageReturn<any>>;


    /**
     * 获取枚举列表
     */
    getEnumList(): Promise<IServerPageReturn<any>>;
    
    /**
     * 
     * @param _param 
     */
    create(_param: any): Promise<IServerPageReturn<any>>;

    /**
     * 修改项目
     * @param _id 
     * @param _param 
     */
    update(_id: string, _param: any): Promise<IServerPageReturn<any>>;

    /**
     * 删除项目
     * @param _id 
     */
    delete(_id: string): Promise<IServerPageReturn<any>>;
}
