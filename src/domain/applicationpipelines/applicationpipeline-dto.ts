import { PipelineBuildStateEnum, StepTypeEnum } from "./applicationpipeline-enum";

import { IEntity } from "@/shared/entity";

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
     pipelineBuildState: PipelineBuildStateEnum;

    /**
     * 流水线Dsl
     */
    pipelineScript: Array<IStageDto>;

    /**
     * 
     */
    nextPipelineId: string;

    /**
     * 开发平台
     */
    developmentLanguage: string;

    

    

}


/**
 * 流水线Dto模型接口
 */
export interface IApplicationPipelineOutputDto extends IApplicationPipelineBaseDto,IEntity<string> {
    /**
     * 流水线状态
     */
    pipelineBuildStateName: string;

    /**
     * JenkinsBuild的Id
     */
    jenkinsBuildNumber:number;

    /**
     * 最后一次执行任务的Id
     */
    lastApplicationPipelineExecutedRecordId:string,

}

export interface IApplicationPipelineSaveDto extends IApplicationPipelineBaseDto, IEntity<string> {
    componentIntegrationId: string;
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