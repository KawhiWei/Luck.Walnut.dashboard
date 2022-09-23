import { Card, Col, Form, Input, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";

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
    }, [])

    const _projectService: IProjectService = useHookProvider(IocTypes.ProjectService);


    const [projectArray, setProjectArray] = useState<Array<any>>([])
    const [loading, setloading] = useState<boolean>(false);
    const [formData] = Form.useForm();


    const onGetProjectList = () => {
        let param = { pageSize: 1000, pageIndex: 1 }
        _projectService.getPageList(param).then(rep => {
            if (rep.success) {
                setProjectArray(rep.result.data)
            }
        })
    }


    return (<div>



        <Spin spinning={loading}>
            <Form form={formData}
                name="horizontal_login"
                layout="horizontal"
                {...searchFormItemDoubleRankLayout}
            >
                <Row >
                    <Col span="6">
                        <Form.Item
                            name="projectId"
                            label="项目：">
                            <Select allowClear={true} placeholder="请选择项目">
                                {projectArray.map((item: any) => {
                                    return <Select.Option value={item.id}>{item.name}</Select.Option>;
                                }
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="appId"
                            label="应用标识：">
                            <Input style={{ borderRadius: 8 }} placeholder="请请输入应用标识" />
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="englishName"
                            label="应用英文名称：">
                            <Input style={{ borderRadius: 8 }} placeholder="请请输入应用英文名称" />
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="chinessName"
                            label="应用中文名称：">
                            <Input style={{ borderRadius: 8 }} placeholder="请请输入应用标识" />
                        </Form.Item>

                    </Col>
                </Row>
            </Form>
            <Row>
                <Col span="24" style={{ textAlign: 'left' }}>
                    <Card title="项目概概况" extra={<a href="#">More</a>} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span="24" style={{ textAlign: 'left' }}>
                    <Card title="项目概概况" extra={<a href="#">More</a>} >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
            <Row >
                <Card title="需求列表" extra={<a href="#">More</a>} >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Row>
            <Row >
                <Card title="测试列表" extra={<a href="#">More</a>} >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Row>
        </Spin>
    </div>)
}

export default ApplicationDashboard;