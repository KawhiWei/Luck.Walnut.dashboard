import { Tag } from "antd";

interface IProp {
    /**
     * 枚举值
     */
    applicationState: string,
    /**
     * 枚举描述
     */
    applicationStateName: string,
}


/**
 * 应用看板
 * @returns 
 */
const ApplicationStateTag = (props: IProp) => {
    /**
     * 处理标签
    * @param _projectStatus 
     * @returns 
     */
    const applicationStateTag = (_applicationState: string): string => {
        switch (_applicationState) {
            case "NotStart":
                return "orange";
            case "UnderDevelopment":
                return "processing";
            case "NotOnline":
                return "magenta";
            case "OnlineRunning":
                return "success";
            case "Offline":
                return "error";
            default:
                return "";
        }
    }

    return (<div>
        <Tag color={applicationStateTag(props.applicationState)}>{props.applicationStateName}</Tag>
    </div>)
}
export default ApplicationStateTag;
