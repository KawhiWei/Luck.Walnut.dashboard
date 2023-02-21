import { ComponentCategoryEnum, ComponentLinkTypeEnum } from "./componentintegration-enum";

export const ComponentTypeMap = [
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

export const ComponentCategoryMap = [
    {
        key: ComponentCategoryEnum.codeWarehouse,
        value: "代码仓库"
    },
    {
        key: ComponentCategoryEnum.pipeLine,
        value: "流水线"
    },
    {
        key: ComponentCategoryEnum.imageWarehouse,
        value: "镜像仓库"
    },

]