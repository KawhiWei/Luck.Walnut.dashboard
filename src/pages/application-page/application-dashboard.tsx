import { Button, Card, Col, Form, Row, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";

import ApplicationInformation from "./application-information";
import { IApplication } from "@/domain/applications/application";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import NewConfigPage from "../config/indexnew";
import PipelinePage from "../pipeline-page/index";
import { RollbackOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

/**
 * 应用看板
 * @returns
 */
const ApplicationDashboard = (props: any) => {
  useEffect(() => {
    DashboardDetail();
  }, []);
  const history = useHistory();

  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const [appId, setAppId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState<IApplication>();

  const DashboardDetail = () => {
    if (props.location.state.appId) {
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
    }
  };

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
        <Row gutter={12} style={{ textAlign: "left", marginTop: 10 }}>
          <Col span="24">
            <Card
              title="应用监控"
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
                defaultActiveKey="1"
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
                    key: "3",
                    children: (
                      <PipelinePage applicationData={applicationData} />
                    ),
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
