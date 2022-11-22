import { StepTypeEnum } from "./applicationpipeline-enum";

/**
 * 状态列表下来选择数组
 */
export const StepTypeMap = [
    {
        key: StepTypeEnum.pullCode,
        value: "拉取代码"
    },
    {
        key: StepTypeEnum.buildDockerImage,
        value: "构建镜像"
    },
    {
        key: StepTypeEnum.executeCommand,
        value: "执行命令"
    }
]