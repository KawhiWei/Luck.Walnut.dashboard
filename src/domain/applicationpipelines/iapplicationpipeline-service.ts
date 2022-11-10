import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IApplicationPipelineService {
    /**
    * 获取表格数据
    */
    getPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<any>>>;

    /**
     * 删除一行数据
     * @param _id 
     */
    delete(_id: string): Promise<IServerReturn<any>>;

    /**
    * 添加应用
    * @param  
    */
    create(_param: any): Promise<IServerReturn<any>>;

    /**
     * 获取详情
     * @param _id 
     */
    getDetail(_id: string): Promise<IServerReturn<any>>;

    /**
     * 获取详情
     * @param _id 
     */
    update(_id: string, _param: any): Promise<IServerReturn<any>>;

    /**
     * 获取应用相关所有枚举
     */
    getApplicationEnumList(): Promise<IServerReturn<any>>;

}