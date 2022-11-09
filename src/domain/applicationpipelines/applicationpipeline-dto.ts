/**
 * 步骤Dto
 */
export interface IStageDto {
    /***
     * 步骤名称
     */
    name: string;

    /**
     * 阶段集合
     */
    steps: Array<IStepDto>;

}

/**
 * 阶段Dto
 */
export interface IStepDto {
    /***
     * 阶段名称
     */
    name: string;


    /**
     * 步骤类型
     */
    stepType: string;

    /**
     * 执行内容
     */
    content: string;
}