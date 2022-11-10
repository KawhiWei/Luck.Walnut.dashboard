import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import { ApplicationStateEnum } from "./applicationstate-enum";
import { IApplicationBaseDto } from "./application-dto";

export interface IApplicationService {
    /**
    * 获取表格数据
    */
    getPage(_param: any): Promise<IServerReturn<IServerPageReturn<IApplicationBaseDto>>>;

    /**
     * 删除一行数据
     * @param _id 
     */
    delete(_id: string): Promise<IServerReturn<any>>;

    /**
    * 添加应用
    * @param  
    */
    addApplication(_param: any): Promise<IServerReturn<any>>;

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

    /**
     * 应用仪表盘明细
     * @param _appId 
     */
    getApplicationDashboardDetail(_appId: string): Promise<IServerReturn<any>>;

    getLanguageList(): Promise<IServerReturn<any>>;
}