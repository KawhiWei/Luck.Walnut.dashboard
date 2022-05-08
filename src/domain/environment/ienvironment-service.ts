import { IServerPageReturn } from "@/shared/entity";

export interface IEnvironmentService{
    /**
     * 获取环境列表
     */
    getList(): Promise<IServerPageReturn<any>>;


    /**
     * 删除一行数据
     * @param _id 
     */
    delete(_id: string): Promise<IServerPageReturn<any>>;

    // /**
    //  * 查询明细
    //  * @param _id 
    //  */
    // getDetail(_id: string): Promise<IServerPageReturn<any>>;

    /**
     * 添加环境
     * @param _param 
     */
    add(_param: any): Promise<IServerPageReturn<any>>;


    /**
     * 根据环境获取配置
     * @param _id 
     */
    getTable(_id: string):Promise<IServerPageReturn<any>>;
}