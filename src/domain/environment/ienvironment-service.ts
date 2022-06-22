import { IServerPageReturn } from "@/shared/entity";

export interface IEnvironmentService{
    /**
     * 获取环境列表
     */
     getEnvironmentList(_applicationId:string): Promise<IServerPageReturn<any>>;


    /**
     * 删除一行数据
     * @param _id 
     */
    deleteEnvironment(_id: string): Promise<IServerPageReturn<any>>;

    // /**
    //  * 查询明细
    //  * @param _id 
    //  */
    // getDetail(_id: string): Promise<IServerPageReturn<any>>;

    /**
     * 添加环境
     * @param _param 
     */
    addEnvironment(_param: any): Promise<IServerPageReturn<any>>;


    /**
     * 根据环境获取配置
     * @param _id 
     */
    getConfigListForEnvironmentId(_id: string, _param:any):Promise<IServerPageReturn<any>>;

    /**
     * 环境添加配置
     * @param _id 
     * @param _param 
     */
    addAppConfiguration(_id: string, _param: any):Promise<IServerPageReturn<any>>;

    /**
     * 删除配置项
     * @param _id 
     */
    deleteAppConfiguration(_id:string,_config:any):Promise<IServerPageReturn<any>>;

    /**
     * 获取配置项明细
     * @param _id 
     */
    getConfigDetail(_id:string):Promise<IServerPageReturn<any>>;
}