import { ComponentLinkTypeEnum } from "./componentintegration-enum";

export const ComponentLinkTypeMap = [
    {
        key: ComponentLinkTypeEnum.gitlab,
        value: "Gitlab代码仓库",
    },
    {
        key: ComponentLinkTypeEnum.goGs,
        value: "Gogs代码仓库"
    },
    {
        key: ComponentLinkTypeEnum.harBor,
        value: "Harbor镜像仓库"
    },
    {
        key: ComponentLinkTypeEnum.jenkins,
        value: "Jenkins流水线引擎"
    },

]