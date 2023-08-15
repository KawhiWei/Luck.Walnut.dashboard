import { Card, Col, Descriptions, Row, Tag } from "antd";

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
      <Row gutter={16} style={{ height: "365px" }}>
        <Col span={12}>
          <Card title="应用简介" style={{ height: "365px" }}>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="部署历史"  style={{ height: "170px" }}>
            <p>Card content</p>
          </Card>
          <Card  title="CI记录" style={{ height: "179px", marginTop: "16px" }}>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>

      <Card title="应用监控"  style={{ marginTop: "16px" }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};
export default ApplicationInformation;
