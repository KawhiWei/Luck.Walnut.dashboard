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
     * 发布任务到Jenkins
     * @param _id 
     */
    publish(_id: string): Promise<IServerReturn<any>>;

    /**
     * 执行一次任务
     * @param _id 
     */
    executeJob(_id: string): Promise<IServerReturn<any>>;

}