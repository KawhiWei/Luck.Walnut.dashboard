import { Descriptions, Tag } from "antd";

import ApplicationStateTag from "./applicationStateTag";
import { IApplicationBaseDto } from "@/domain/applications/application-dto";

interface IProp {
  /**
   * 应用信息
   */
  applicationData?: IApplicationBaseDto;
}

/**
 * 应用看板
 * @returns
 */
const ApplicationInformation = (props: IProp) => {
  return (
    <div>
        <Descriptions size="small" bordered column={1} style={{ padding: "10px" }}>
          <Descriptions.Item label="应用标识：">
            {props.applicationData?.appId}
          </Descriptions.Item>
          <Descriptions.Item label="应用描述：">
            {props.applicationData?.describe}
          </Descriptions.Item>
        </Descriptions>
    </div>
  );
};
export default ApplicationInformation;
