import { Card, Col, Descriptions, Row, Tag, Timeline } from "antd";

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
      <Row gutter={8} style={{ height: "365px" }}>
        <Col span={10}>
          <Card title={props.applicationData?.appId} style={{ overflowY: 'auto', height: "365px" }}>
            <p><Tag>管理人员</Tag>{props.applicationData?.describe}</p>
            <p><Tag>应用名称</Tag>{props.applicationData?.name}</p>
            <p><Tag>Git地址</Tag>{props.applicationData?.gitUrl}</p>
            <p><Tag>应用描述</Tag>{props.applicationData?.describe}</p>
          </Card>
        </Col>
        <Col span={14}>
          <Card size="small" title="构建计划" style={{ overflow: 'auto', height: "170px" }}>
            <Timeline>
              <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="#00CCFF" >
                <p>Custom color testing</p>
              </Timeline.Item>
            </Timeline>
          </Card>
          <Card style={{ height: "185px", marginTop: "8px" }}>
          </Card>
        </Col>
      </Row>
      <Card size="small" title="应用监控" style={{ marginTop: "8px" }}>
      </Card>
    </div>
  );
};
export default ApplicationInformation;
