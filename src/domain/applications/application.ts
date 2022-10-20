export interface IApplication {
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
  chinessName: string;
  
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
  applicationState: string;
  
  /**
   * 状态名称
   */
  applicationStateName: string,

  /**
   * 应用级别名称
   */
  applicationLevelName: string,
  /**
   * 应用描述
   */
  describe: string,
  

  
  
}