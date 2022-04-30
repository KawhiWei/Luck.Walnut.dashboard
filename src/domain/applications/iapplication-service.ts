import { IServerPageReturn } from "@/shared/entity";

export interface IApplicationService {
    /**
    * 获取表格数据
    */
    gettable(): Promise<IServerPageReturn<any>>;

    /**
   * 删除一行数据
   * @param _id 
   */
    delete(_id: string): Promise<IServerPageReturn<any>>;

    /**
    * 删除一行数据
    * @param 添加应用 
    */
    addApplication(_param: any): Promise<IServerPageReturn<any>>;
}