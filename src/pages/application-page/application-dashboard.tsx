import { Button, Card, Col, Layout, Row, Spin, Tabs, Tag, Timeline } from "antd";
import { useEffect, useState } from "react";

import ApplicationInformation from "./application-information";
import DeploymentConfigurationPage from "../deployment/index";
import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "@/shared/config/ioc-types";
import PipelinePage from "../application-pipeline-page/index";
import RollbackOutlined from "@ant-design/icons";
import ServicePage from "../wke/kubernetes/service-page";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

/**
 * 应用看板
 * @returns
 */
const ApplicationDashboard = (props: any) => {
  const [defaultActiveKey, setDefaultActiveKey] = useState<string>("1");
  const history = useHistory();

  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const [appId, setAppId] = useState<string>("");
  const [appLoading, setAppLoading] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState<IApplicationBaseDto>();

  const Load = () => {
    if (props.location.state && props.location.state.appId) {
      setAppId(props.location.state.appId);
      onGetApplication(props.location.state.appId)
    } else {
      backToApplicationList();
    }
  };
  useEffect(() => {
    Load();
  }, []);

  const onGetApplication = (_appId: string) => {

    setAppLoading(true);
    _applicationService
      .getApplicationDashboardDetail(props.location.state.appId)
      .then((rep) => {
        if (rep.success) {
          setApplicationData(rep.result.application);
        }
      })
      .finally(() => {
        setAppLoading(false);
      });
    if (props.location.state.defaultActiveKey) {
      setDefaultActiveKey(props.location.state.defaultActiveKey);
    }


  }
  /**
   * 跳转到应用列表
   * @param _appId
   */
  const backToApplicationList = () => {
    history.push({
      pathname: "/application/list",
    });
  };

  return (
    <Tabs
      tabPosition="left"
      size="small"
      defaultActiveKey={defaultActiveKey}
      items={[
        {
          label: `基础信息`,
          key: "1",
          children: (
            <div>
              <Row gutter={8} style={{ height: "365px" }}>
                <Col span={10}>
                  <Spin spinning={appLoading}>
                    <Card title={props.applicationData?.appId} style={{ overflowY: 'auto', height: "365px" }}>
                      <p><Tag>管理人员</Tag>{applicationData?.describe}</p>
                      <p><Tag>应用名称</Tag>{applicationData?.name}</p>
                      <p><Tag>Git地址</Tag>{applicationData?.gitUrl}</p>
                      <p><Tag>应用描述</Tag>{applicationData?.describe}</p>
                    </Card>
                  </Spin>
                </Col>
                <Col span={14}>
                  <Card size="small" title="构建计划" style={{ height: "365px" }}>
                    <div style={{ overflow: 'auto', paddingTop:"5px", height: "300px" }}>
                      <Timeline>
                        <Timeline.Item color="red">
                          <p>Solve initial network problems 1</p>
                        </Timeline.Item>
                        <Timeline.Item>
                          <p>Technical testing 1</p>
                        </Timeline.Item>
                        <Timeline.Item>
                          <p>Technical testing 1</p>
                        </Timeline.Item>
                        <Timeline.Item>
                          <p>Technical testing 1</p>
                        </Timeline.Item>
                        <Timeline.Item>
                          <p>Technical testing 1</p>
                        </Timeline.Item>
                        <Timeline.Item>
                          <p>Technical testing 1</p>
                        </Timeline.Item>
                        <Timeline.Item>
                          <p>Technical testing 1</p>
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card size="small" title="应用监控" style={{ marginTop: "8px" }}>

                  </Card>
                </Col>

              </Row>
            </div>
          ),
        },
        {
          label: `持续集成`,
          key: "2",
          children: <PipelinePage appId={appId} />,
        },
        {
          label: `持续部署`,
          key: "3",
          children: <DeploymentConfigurationPage appId={appId} />,
        },
      ]}></Tabs>
  );
};
export default ApplicationDashboard;
