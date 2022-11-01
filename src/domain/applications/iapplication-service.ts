import { IServerPageReturn } from "@/shared/entity";

export interface IApplicationService {
    /**
    * 获取表格数据
    */
    getPage(_param: any): Promise<IServerPageReturn<any>>;

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

    /**
     * 获取应用相关所有枚举
     */
    getApplicationEnumList(): Promise<IServerPageReturn<any>>;

    /**
     * 应用仪表盘明细
     * @param _appId 
     */
    getApplicationDashboardDetail(_appId:string): Promise<IServerPageReturn<any>>;

    getLanguageList(): Promise<IServerPageReturn<any>>;
}