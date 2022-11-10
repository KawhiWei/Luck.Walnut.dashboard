import { PipelineStateEnum, StepTypeEnum } from "./applicationpipeline-enum";

/**
 * 流水线Dto模型接口
 */
export interface IApplicationPipelineBaseDto {

    /**
    * 流水线名称
    */
    name: string;
    /**
     * 是否发布
     */
    published: boolean;

    /**
     * 归属环境
     */
    appEnvironmentId: string;

    /**
     * 阶段集合
     */
    appId: string;

    /**
     * 流水线状态
     */
    pipelineState: PipelineStateEnum;

    /**
     * 流水线Dsl
     */
    pipelineScript: Array<IStageDto>;

    /**
     * 
     */
    nextPipelineId: string;

}

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
    stepType: StepTypeEnum;

    /**
     * 执行内容
     */
    content: string;
}