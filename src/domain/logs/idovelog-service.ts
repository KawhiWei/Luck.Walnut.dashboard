import { IServerPageReturn } from "@/shared/entity";
export interface IDoveLogService {
    /**
     * 获取环境列表
     */
    getDoveLogList(_param: any): Promise<IServerPageReturn<any>>;

}
