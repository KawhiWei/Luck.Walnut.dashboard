import { IServerPageReturn } from "@/shared/entity";

export interface IComponentIntegrationService {

    /**
     * 获取分页数据
     * @param _param 
     * @returns 
     */
    getPage(_param: any): Promise<IServerPageReturn<any>>;


    /**
     * 添加组件集成
     * @param _param 
     * @returns 
     */
    add(_param: any): Promise<IServerPageReturn<any>>;

    /**
     * 修改组件集成配置
     * @param _param 
     * @returns 
     */
    update(_id: string, _param: any): Promise<IServerPageReturn<any>>;


    /**
     * 删除组件集成
     * @param _id 
     * @returns 
     */
    delete(_id: string): Promise<IServerPageReturn<any>>;

    /**
     * 获取详细信息
     * @param _id 
     * @returns 
     */
    getDetail(_id: string): Promise<IServerPageReturn<any>>;

    /**
     * 获取组件集成类型枚举
     */
    getEnumList(): Promise<IServerPageReturn<any>>;
}