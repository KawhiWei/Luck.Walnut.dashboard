import { IServerPageReturn } from "@/shared/entity";

export interface IApplicationService {
    /**
* 获取表格数据
*/
    gettable(): Promise<IServerPageReturn<any>>;
}