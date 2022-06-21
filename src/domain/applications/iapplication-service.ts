import { IServerPageReturn } from "@/shared/entity";

export interface IApplicationService {
    /**
    * 获取表格数据
    */
    gettable(_param: any): Promise<IServerPageReturn<any>>;

    /**
     * 删除一行数据
     * @param _id 
     */
    delete(_id: string): Promise<IServerPageReturn<any>>;

    /**
    * 添加应用
    * @param  
    */
    addApplication(_param: any): Promise<IServerPageReturn<any>>;

    /**
     * 获取详情
     * @param _id 
     */
     getDetail(_id: string): Promise<IServerPageReturn<any>>;

         /**
     * 获取详情
     * @param _id 
     */
    update(_id: string,_param: any): Promise<IServerPageReturn<any>>;
}