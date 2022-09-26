import { Card, Col, Form, Input, List, Row, Select, Spin, Tabs, Tag } from "antd";
import { useEffect, useState } from "react";

import ApplicationStateTag from "./applicationStateTag"
import { IApplication } from "@/domain/applications/application";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
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
                    console.log(rep)
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

    return (<div>

        <Spin spinning={loading}>
            <Row gutter={12} style={{ textAlign: 'left', marginTop: 10 }}>
                <Col span="8" >
                    <Card size="small" title="应用简介" extra={<a href="#">More</a>} >
                        <Form size="small">
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
                    <Card size="small" >
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="配置中心" key="1">
                                <Spin spinning={loading}>
                                    <Row gutter={12} style={{ textAlign: 'left', marginTop: 10 }}>
                                        <Col span="24" >
                                            配置中心
                                        </Col>
                                    </Row>
                                </Spin>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="环境列表" key="2">
                                环境列表
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="实例列表" key="3">
                                实例列表
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="应用监控" key="4">
                                应用监控
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="应用日志" key="5">
                                应用日志
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </Spin>

    </div>)
}
export default ApplicationDashboard;