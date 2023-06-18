import 'antd/dist/antd.css';
import "./task-list.less"

import {
    Anchor,
    Avatar,
    Button,
    Card,
    Col,
    Drawer,
    Form,
    Input,
    Modal,
    Row,
    Skeleton
} from "antd";
import {
    formItemSingleRankLayout,
    tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { OperationTypeEnum } from "@/shared/operation/operationType";

interface IProp {

    /**
     * 回调事件
     */
    onCallbackEvent: any;

    /**
     * 阶段下标
     */
    stageIndex: number;
}

/***
 * 任务列表
 */
const TaskList = (props: IProp) => {
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        editOperationState(true, "选择任务");

    }, []);

    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false);
        props.onCallbackEvent();
    };

    /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    };

    return (
        <div className="task-list">
            <Drawer
                width={600}
                style={{ borderRadius: 6 }}
                getContainer={false}
                onClose={() => onCancel()}
                title={
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        {operationState.title}
                    </div>
                }
                // closable={false}
                open={operationState.visible}
                footer={null}
            >

                <div className="menu-wrapper">
                    <div className="menu-wrapper-body">
                        <div className="pipeline-stage-template-menu">

                            <div className="pipeline-stage-template-menu-body">

                                <div className="pipeline-stage-template-menu-body-sidebar">
                                    <Anchor affix={true}>
                                        <Anchor.Link href="#components-anchor-demo-basic" title="代码扫描" />
                                        <Anchor.Link href="#components-anchor-demo-static" title="构建" />
                                        <Anchor.Link href="#Anchor-Props" title="测试" />
                                        <Anchor.Link href="#Link-Props" title="镜像构建" />
                                    </Anchor>
                                </div>
                                <div className="pipeline-stage-template-menu-body-content">
                                    <Row gutter={[15, 10]} style={{ marginTop: "10px" }} >
                                        <Col span={12}>
                                            <Card>
                                                <Skeleton loading={false} avatar active>
                                                    <Card.Meta
                                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                        title="Card title"
                                                        description="This"
                                                    />
                                                </Skeleton>
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card>
                                                <Skeleton loading={false} avatar active>
                                                    <Card.Meta
                                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                        title="Card title"
                                                        description="This"
                                                    />
                                                </Skeleton>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row gutter={[15, 40]} style={{ marginTop: "10px" }}>
                                        <Col span={12}>
                                            <Card >
                                                <Skeleton loading={false} avatar active>
                                                    <Card.Meta
                                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                        title="Card title"
                                                        description="This"
                                                    />
                                                </Skeleton>
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card>
                                                <Skeleton loading={false} avatar active>
                                                    <Card.Meta
                                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                        title="Card title"
                                                        description="This"
                                                    />
                                                </Skeleton>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default TaskList;

