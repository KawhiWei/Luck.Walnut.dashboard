import { ITaskCategoryDto } from "@/domain/pipelinetemplates/pipelinetemplate-dto";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";

/**
 * 任务类型
 */
export const taskList: ITaskCategoryDto[] = [
    {
        name: "代码",
        tasks: [
            {
                name: "拉取代码",
                content: "",
                stepType: StepTypeEnum.pullCode,
                icon: ""
            }
        ]
    },
    {
        name: "镜像构建",
        tasks: [
            {
                name: "DockerFile编译构建推送",
                content: "",
                stepType: StepTypeEnum.pullCode,
                icon: ""
            },
            {
                name: "DockerFile编译构建推送",
                content: "",
                stepType: StepTypeEnum.pullCode,
                icon: ""
            },
            {
                name: "DockerFile编译构建推送",
                content: "",
                stepType: StepTypeEnum.pullCode,
                icon: ""
            },
            {
                name: "DockerFile编译构建推送",
                content: "",
                stepType: StepTypeEnum.pullCode,
                icon: ""
            }
        ]
    }
]