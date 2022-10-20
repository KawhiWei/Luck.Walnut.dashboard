import {
  Card,
  Col,
  Form,
  Input,
  List,
  Row,
  Select,
  Spin,
  Tabs,
  Tag,
} from "antd";
import { useEffect, useState } from "react";

import ApplicationInformation from "./application-information";
import ApplicationStateTag from "./applicationStateTag";
import EnvironmentPage from "../environment/index";
import { IApplication } from "@/domain/applications/application";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

/**
 * 应用看板
 * @returns
 */
const ApplicationDashboard = (props: any) => {
  useEffect(() => {
    onGetProjectList();
    DashboardDetail();
  }, []);

  const _projectService: IProjectService = useHookProvider(
    IocTypes.ProjectService
  );
  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const [appId, setAppId] = useState<string>();
  const [projectArray, setProjectArray] = useState<Array<any>>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [formData] = Form.useForm();
  const [applicationData, setApplicationData] = useState<IApplication>();

  const _environmentService: IEnvironmentService = useHookProvider(
    IocTypes.EnvironmentService
  );
  const [environmentTableData, setEnvironmentTableData] = useState<Array<any>>(
    []
  );

  const [tabsArray, setTabsArray] = useState<Array<any>>(
    []
  );
  const [environmentPage, setEnvironmentPage] = useState<any>();
  const [tabsLoading, setTabsLoading] = useState<boolean>(false);
  const onGetProjectList = () => {
    let param = { pageSize: 1000, pageIndex: 1 };
    _projectService.getPageList(param).then((rep) => {
      if (rep.success) {
        setProjectArray(rep.result.data);
      }
    });
  };

  const DashboardDetail = () => {
    if (props.location.state.appId) {
      setAppId(props.location.state.appId);
      setloading(true);
      _applicationService
        .getApplicationDashboardDetail(props.location.state.appId)
        .then((rep) => {
          if (rep.success) {
            setApplicationData(rep.result.application);
            setloading(false);
          }
        });
    }
  };

  /**
   * 
   * @param activeKey 
   */
  const tabsOnChange = (activeKey: string) => {
    switch (activeKey) {
      case "2":
        // setEnvironmentPage(<EnvironmentPage appId={appId} environmentDataArray={environmentTableData} />)
        break;
      default:
        break;
    }
  };
  /**
   * 获取列表信息
   */
  const getEnvironmentList = () => {
    setTabsLoading(true);
    applicationData && console.log(applicationData.appId);
    applicationData &&
      _environmentService
        .getEnvironmentList(applicationData.appId)
        .then((x) => {
          if (x.success) {
            setEnvironmentTableData(x.result);
            setTabsLoading(false);
          }
        });
  };
  return (
    <div>
      <Spin spinning={loading}>
        <Row gutter={12} style={{ textAlign: "left", marginTop: 10 }}>
          <Col span="24">
            <Card>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: `应用信息`,
                    key: "1",
                    children: (
                      <ApplicationInformation
                        applicationData={applicationData}
                      />
                    ),
                  },
                  {
                    label: `配置管理`,
                    key: "2",
                    children: `Content of Tab Pane 2`,
                  },
                  {
                    label: `应用流水线`,
                    key: "3",
                    children: `奥术大师大所多啊实打实打阿萨德ad啊`,
                  },
                  {
                    label: `发布记录`,
                    key: "4",
                    children: `实打实的阿打算亲の 32额哇32额ad2312阿萨德俺是3额阿萨德啊`,
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
