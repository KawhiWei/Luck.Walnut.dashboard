import { Card, Col, Form, Input, List, Row, Select, Spin, Tabs, Tag } from "antd";
import { useEffect, useState } from "react";

import ApplicationStateTag from "./applicationStateTag"
import EnvironmentPage from "../environment/index"
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
    }, [])

    const _projectService: IProjectService = useHookProvider(IocTypes.ProjectService);
    const _applicationService: IApplicationService = useHookProvider(IocTypes.ApplicationService);
    const [appId, setAppId] = useState<string>();
    const [projectArray, setProjectArray] = useState<Array<any>>([])
    const [loading, setloading] = useState<boolean>(false);
    const [formData] = Form.useForm();
    const [applicationData, setApplicationData] = useState<IApplication>();
    const [applicationStateTagComponent, SetapplicationStateTagComponent] = useState<any>();
    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);
    const [environmentTableData, setEnvironmentTableData] = useState<Array<any>>([]);
    const [environmentPage, setEnvironmentPage] = useState<any>();
    const [tabsLoading, setTabsLoading] = useState<boolean>(false);
    const onGetProjectList = () => {
        let param = { pageSize: 1000, pageIndex: 1 }
        _projectService.getPageList(param).then(rep => {
            if (rep.success) {
                setProjectArray(rep.result.data)
            }
        })
    }

    const DashboardDetail = () => {
        if (props.location.state.appId) {
            setAppId(props.location.state.appId)
            setloading(true);
            _applicationService.getApplicationDashboardDetail(props.location.state.appId).then(rep => {
                if (rep.success) {
                    setApplicationData(rep.result.application)
                    SetapplicationStateTagComponent(<ApplicationStateTag applicationState={rep.result.application.applicationState} applicationStateName={rep.result.application.applicationStateName} />)
                    setloading(false);
                }
            })
        }
    }
    /**
     * 处理标签
     * @param _projectStatus 
     * @returns 
     */
    const getapplicationStateTag = (_applicationState: any): string => {
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
    const tabsOnChange = (activeKey: string) => {
        switch (activeKey) {
            case "2":
                setEnvironmentPage(<EnvironmentPage appId={appId} environmentDataArray={environmentTableData} />)
                break;
            default:
                break;
        }
    }
    /**
         * 获取列表信息
         */
    const getEnvironmentList = () => {
        setTabsLoading(true);
        applicationData && console.log(applicationData.appId)
        applicationData && _environmentService.getEnvironmentList(applicationData.appId).then((x) => {
            if (x.success) {
                setEnvironmentTableData(x.result);
                setTabsLoading(false);
            }
        })
    }

    return (<div>
        <Spin spinning={loading}>
            <Row gutter={12} style={{ textAlign: 'left', marginTop: 10 }}>
                <Col span="8" >
                    <Card  title="应用简介" extra={<a href="#">More</a>} >
                        <Form >
                            <Form.Item
                                label="AppId：">{applicationData?.appId}
                            </Form.Item>
                            <Form.Item
                                label="应用状态：">
                                {applicationStateTagComponent}
                            </Form.Item>
                            <Form.Item
                                label="应用名称：">{applicationData?.appId}
                            </Form.Item>
                            <Form.Item
                                label="中文名称：">{applicationData?.chinessName}
                            </Form.Item>
                            <Form.Item
                                label="英文名称：">{applicationData?.englishName}
                            </Form.Item>
                            <Form.Item
                                label="负责人：">{applicationData?.principal}
                            </Form.Item>
                            <Form.Item
                                label="应用描述：">{applicationData?.describe}
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Row gutter={12} style={{ textAlign: 'left', marginTop: 10 }}>
                <Col span="24" >
                    <Card  >
                        <Tabs defaultActiveKey="1" onChange={tabsOnChange}
                            items={[
                                {
                                    label: `Tab 1`,
                                    key: '1',
                                    children: `Content of Tab Pane 1`,
                                },
                                {
                                    label: `Tab 2`,
                                    key: '2',
                                    children: ({ environmentPage }),
                                },
                                {
                                    label: `Tab 3`,
                                    key: '3',
                                    children: `Content of Tab Pane 3`,
                                },
                            ]}
                        >
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </Spin>

    </div>)
}
export default ApplicationDashboard;