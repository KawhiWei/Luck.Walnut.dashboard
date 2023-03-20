import { Button, Card, Col, Row, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";

import ApplicationInformation from "./application-information";
import DeploymentConfigurationPage from "../deployment-configuration-page/index";
import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "@/shared/config/ioc-types";
import PipelinePage from "../application-pipeline-page/index";
import RollbackOutlined from "@ant-design/icons";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState<IApplicationBaseDto>();

  const DashboardDetail = () => {
    if (props.location.state && props.location.state.appId) {
      setAppId(props.location.state.appId);
      setLoading(true);
      _applicationService
        .getApplicationDashboardDetail(props.location.state.appId)
        .then((rep) => {
          if (rep.success) {
            setApplicationData(rep.result.application);
          }
        })
        .finally(() => {
          setLoading(false);
        });
      if (props.location.state.defaultActiveKey) {
        setDefaultActiveKey(props.location.state.defaultActiveKey);
      }
    } else {
      backToApplicationList();
    }
  };
  useEffect(() => {
    DashboardDetail();
  }, []);

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
    <div>
      <Spin spinning={loading}>
        <Row gutter={12} style={{ textAlign: "left" }}>
          <Col span="24">
            <Card
              title="应用面板"
              extra={
                <Button
                  shape="round"
                  style={{ margin: "8px 8px " }}
                  onClick={() => {
                    backToApplicationList();
                  }}
                >
                  <RollbackOutlined />
                  返回上一层
                </Button>
              }
            >
              <Tabs
                defaultActiveKey={defaultActiveKey}
                items={[
                  {
                    label: `基础信息`,
                    key: "1",
                    children: (
                      <ApplicationInformation
                        applicationData={applicationData}
                      />
                    ),
                  },
                  {
                    label: `应用流水线`,
                    key: "2",
                    children: <PipelinePage appId={appId} />,
                  },
                  {
                    label: `部署配置`,
                    key: "3",
                    children: <DeploymentConfigurationPage appId={appId} />,
                  },
                ]}
              ></Tabs>
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};
export default ApplicationDashboard;
