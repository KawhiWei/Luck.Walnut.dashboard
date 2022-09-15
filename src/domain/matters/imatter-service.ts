import { IServerPageReturn } from "@/shared/entity";

export interface IMatterService {
   
    /**
     * 添加需求事项
     * @param _param 
     */
    addMatter(_param: any): Promise<IServerPageReturn<any>>;
   
    /**
     * 删除一行数据
     * @param _id 
     */
    deleteEnvironment(_id: string): Promise<IServerPageReturn<any>>;

    /**
     * 修改事项
     * @param _id 
     * @param _param 
     */
    updateAppConfiguration(_id: string, _param: any):Promise<IServerPageReturn<any>>;
    
    /**
     * 获取明细
     * @param _id 
     */
    getDetail(_id:string):Promise<IServerPageReturn<any>>;

    getMatterList( _param: any): Promise<IServerPageReturn<any>>;
}