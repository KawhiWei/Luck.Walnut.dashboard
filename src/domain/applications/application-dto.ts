import { ApplicationLevelEnum, ApplicationStateEnum } from "./applicationstate-enum";

export interface IApplicationBaseDto {
  /***
   * 唯一标识
   */
  appId: string;

  /**
   * 英文名称
   */
  englishName: string;

  /**
   * 中文名称
   */
  chineseName: string;

  /**
   * 归属部门
   */
  departmentName: string;

  /**
   * 负责人
   */
  principal: string;

  /**
   * 应用状态
   */
  applicationState: ApplicationStateEnum;

  /**
   * 状态名称
   */
  applicationStateName: string,

  /**
   * 应用级别
   */
  applicationLevel: ApplicationLevelEnum

  /**
   * 应用级别名称
   */
  applicationLevelName: string,
  /**
   * 应用描述
   */
  describe: string,


  /**
   * 仓库地址
   */
  codeWarehouseAddress: string,

  /**
   * 
   */
  buildImage: string,

  /**
 * 
 */
  buildImageId: string;
  /**
 * 
 */
  buildImageName: string;
}

export interface IApplicationDto extends IApplicationBaseDto{

  /**
   * 
   */
  buildImageName: string;


  /**
   * 
   */
  compileScript:string;
}