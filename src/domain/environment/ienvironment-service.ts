import { IServerPageReturn } from "@/shared/entity";

export interface IEnvironmentService{
    /**
     * 获取环境列表
     */
    getTable(): Promise<IServerPageReturn<any>>;


}