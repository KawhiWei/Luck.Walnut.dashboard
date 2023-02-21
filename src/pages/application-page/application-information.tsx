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
      <div>
        <Descriptions bordered column={2} style={{ padding: "30px" }}>
          <Descriptions.Item label="AppId：">
            {props.applicationData?.appId}
          </Descriptions.Item>
          <Descriptions.Item label="英文名称：">
            {props.applicationData?.appId}
          </Descriptions.Item>
          <Descriptions.Item label="中文名称：">
            {props.applicationData?.appId}
          </Descriptions.Item>
          <Descriptions.Item label="归属部门：">
            {props.applicationData?.departmentName}
          </Descriptions.Item>
          <Descriptions.Item label="负责人：">
            {props.applicationData?.principal}
          </Descriptions.Item>
          <Descriptions.Item label="应用状态：">
            {props.applicationData && (
              <ApplicationStateTag
                applicationState={props.applicationData.applicationState}
                applicationStateName={
                  props.applicationData.applicationStateName
                }
              />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="应用级别：">
            {props.applicationData?.applicationLevelName}
          </Descriptions.Item>
          <Descriptions.Item label="应用描述：">
            {props.applicationData?.describe}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};
export default ApplicationInformation;
