/***
 * 步骤枚举类型
 */
export enum StepTypeEnum {
    /**
     * 拉取代码
     */
    pullCode = 1,
    /**
     * 构建Docker镜像
     */
    buildDockerImage = 2,
    /**
     * 执行命令
     */
    executeCommand = 3,
}

/**
 * 流水线状态枚举
 */
export enum PipelineStateEnum {
    /**
     * 准备完成
     */
    ready = 0,
    /**
     * 执行中
     */
    running = 1,
    /**
     * 成功
     */
    success = 2,
    /**
    * 失败
    */
    fail = 3,
}


