import "../drawer.less";

import { ApplicationRuntimeTypeEnum, DeploymentTypeEnum } from "@/domain/deployment-configurations/deployment-configuration-enum";
import { ApplicationRuntimeTypeMap, DeploymentTypeMap } from "@/domain/maps/deployment-configuration-map";
import { Button, Drawer, Form, Input, InputNumber, Select, Space, message } from "antd";
import { IDeploymentConfigurationDto, IMasterContainerConfigurationInputDto } from "@/domain/deployment-configurations/deployment-configuration-dto";
import { useEffect, useState } from "react";

import { IClusterOutputDto } from "@/domain/kubernetes/clusters/cluster-dto";
import { IClusterService } from "@/domain/kubernetes/clusters/icluster-service";
import { IDeploymentConfigurationService } from "@/domain/deployment-configurations/ideployment-configuration-service";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IInitContainerConfigurationOutputDto } from "@/domain/init-container-configurations/iinit-container-service-dto";
import { IInitContainerService } from "@/domain/init-container-configurations/iinit-container-service";
import { INameSpaceOutputDto } from "@/domain/kubernetes/namespaces/namespace-dto";
import { INameSpaceService } from "@/domain/kubernetes/namespaces/inamespace-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import _ from "lodash";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

// import "../description.less";



interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;

    /**
     * id
     */
    id?: string;

    /**
     * 操作类型
     */
    operationType: OperationTypeEnum;

    /**
     * 应用Id
     */
    appId: string;
    /**
     * 主容器配置Id
     */
    masterContainerId?: string
}

const validateMessages = {
    required: "${label} 不可为空",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};
const Operation = (props: IProp) => {
    const _nameSpaceService: INameSpaceService = useHookProvider(IocTypes.NameSpaceService);
    const _clusterService: IClusterService = useHookProvider(IocTypes.ClusterService);
    const _environmentService: IEnvironmentService =
        useHookProvider(IocTypes.EnvironmentService);
    const _deploymentConfigurationService: IDeploymentConfigurationService = useHookProvider(IocTypes.DeploymentConfigurationService);


    const [clusterData, setClusterData] = useState<Array<IClusterOutputDto>>([]);
    const [nameSpaceArrayData, setNameSpaceArrayData] = useState<Array<INameSpaceOutputDto>>([]);

    const _initContainerService: IInitContainerService = useHookProvider(IocTypes.InitContainerService);
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });

    const [loading, setLoading] = useState<boolean>(false);

    const [clusterId, setClusterId] = useState<string>('');
    const [environmentData, setEnvironmentData] = useState<Array<any>>([]);

    const [initContainerData, setInitContainerData] = useState<Array<IInitContainerConfigurationOutputDto>>([]);
    const [deploymentConfigurationData, setDeploymentConfigurationData] = useState<IDeploymentConfigurationDto>();
    const [masterContainerConfiguration, setMasterContainerConfiguration] = useState<IMasterContainerConfigurationInputDto>({
        containerName: '',
        restartPolicy: 'always',
        isInitContainer: false,
        imagePullPolicy: 'Always'
    });

    const [deploymentConfigurationFormData] = Form.useForm();
    const [masterContainerConfigurationFormData] = Form.useForm();


    /**
     * 初始化加载事件
     */
    useEffect(() => {
        onLoad();
    }, []);

    /**
     * 编辑获取一个表单
     * @param _id
     */
    const onLoad = () => {
        onClusterList();
        onGetNameSpaceList();
        onGetEnvironmentList();
        switch (props.operationType) {
            case OperationTypeEnum.add:
                deploymentConfigurationFormData.setFieldsValue(deploymentConfigurationData)
                editOperationState(true, "添加");
                break;
            case OperationTypeEnum.edit:
                onGetDeploymentDetail()
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看");
                break;

        }
    };

    /**
     * 获取集群
     */
    const onClusterList = () => {
        _clusterService.getClusterList().then(rep => {
            if (rep.success) {
                setClusterData(rep.result)

            } else {
                message.error(rep.errorMessage, 3);
            }
        })
    }

    const onChangeClusterId = (_clusterId: string) => {
        setClusterId(_clusterId)
    };

    /**
      * 查询命名空间根据集群Id
      */
    const onGetEnvironmentList = () => {
        let _param = {
            pageSize: 100,
            pageIndex: 1,
        };
        _environmentService.getPage(_param).then(rep => {
            if (rep.success) {
                setEnvironmentData(rep.result.data)

            } else {
                message.error(rep.errorMessage, 3);
            }
        })

    };


    /**
      * 查询命名空间根据集群Id
      */
    const onGetNameSpaceList = () => {
        _nameSpaceService.getNameSpaceList().then(rep => {
            if (rep.success) {
                setNameSpaceArrayData(rep.result)

            } else {
                message.error(rep.errorMessage, 3);
            }
        })

    };

    /**
     * 查询配置详情
     */
    const onGetInitContainerList = () => {
        _initContainerService.getInitContainerConfigurationList().then(rep => {
            setInitContainerData(rep.result)
        })
    }


    /**
     * 查询配置详情
     */
    const onGetDeploymentDetail = () => {
        props.id && _deploymentConfigurationService.getDeploymentDetail(props.id).then(rep => {
            if (rep.success) {
                deploymentConfigurationFormData.setFieldsValue(rep.result);
                console.log(rep.result)
                editOperationState(true, "编辑");
            } else {
                message.error(rep.errorMessage, 3);
            }
        })
    }

    /**
     * 底部栏OK事件
     */
    const onFinish = () => {
        deploymentConfigurationFormData.validateFields().then((_deployment: IDeploymentConfigurationDto) => {
            _deployment.appId = props.appId;
            switch (props.operationType) {
                case OperationTypeEnum.add:
                    onCreate(_deployment);
                    break;
                case OperationTypeEnum.edit:
                    props.id && onUpdateDeployment(_deployment)
                    break;
            }

        }).catch((error) => { });
    };

    /**
     * 修改事件
     */
    const onUpdateDeployment = (_deployment: IDeploymentConfigurationDto) => {
        setLoading(true);
        // (props.id && props.masterContainerId) && _deploymentConfigurationService.updateDeployment(props.id, props.masterContainerId, _deployment).then(rep => {
        //     if (!rep.success) {
        //         message.error(rep.errorMessage, 3);
        //     } else {
        //         message.success("保存成功", 3);
        //         props.onCallbackEvent && props.onCallbackEvent();
        //     }
        // }).finally(() => {
        //     setLoading(false);
        // });
    };

    /**
     * 弹框取消事件
     */
    const onCreate = (_param: IDeploymentConfigurationDto) => {
        setLoading(true);
        _deploymentConfigurationService.createDeployment(_param).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3);
            } else {
                message.success("保存成功", 3);
                props.onCallbackEvent && props.onCallbackEvent();
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false);
        props.onCallbackEvent && props.onCallbackEvent();
    };

    /**
     * 修改弹框属性
     * @param _visible
     * @param _title
     */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title + '部署配置' });
    };

    return (
        <div>
            <Drawer
                width="600px"
                title={
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        {operationState.title}
                    </div>
                }
                onClose={() => onCancel()}
                closable={true}
                open={operationState.visible}
                footer={
                    <Space style={{ float: "right" }}>
                        <Button
                            shape="round"
                            disabled={loading}
                            onClick={() => onCancel()}
                        >
                            取消
                        </Button>
                        <Button
                            shape="round"
                            style={{ margin: "0 8px" }}
                            type="primary"
                            loading={loading}
                            onClick={() => onFinish()}
                        >
                            保存
                        </Button>
                    </Space>
                }>

                <Form
                    form={deploymentConfigurationFormData}
                    name="nest-messages"
                    layout="vertical"
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="chineseName"
                        label="中文名称"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="environmentName"
                        label="部署环境"
                        rules={[{ required: true }]}
                    >
                        <Select
                            allowClear={true}
                            placeholder="部署环境"
                            onChange={onChangeClusterId}
                        >
                            {environmentData.map((item: any) => {
                                return (
                                    <Select.Option value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="clusterId"
                        label="部署集群"
                        rules={[{ required: true }]}
                    >
                        <Select
                            allowClear={true}
                            placeholder="绑定集群"
                            onChange={onChangeClusterId}
                        >
                            {clusterData.map((item: IClusterOutputDto) => {
                                return (
                                    <Select.Option value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="nameSpace"
                        label="命名空间"
                        rules={[{ required: true }]}>
                        <Select
                            allowClear={true}
                        >
                            {nameSpaceArrayData.filter(x => x.clusterId === clusterId).map((item: INameSpaceOutputDto) => {
                                return (
                                    <Select.Option value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="applicationRuntimeType"
                        label="运行时类型"
                        rules={[{ required: true }]}>
                        <Select allowClear={true}
                            placeholder="请选择运行时类型">
                            {ApplicationRuntimeTypeMap.map((item: any) => {
                                return (
                                    <Select.Option value={item.key}>
                                        {item.value}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="deploymentType"
                        label="部署类型"
                        rules={[{ required: true }]}
                    >
                        <Select allowClear={true}
                            placeholder="请选择部署类型">
                            {DeploymentTypeMap.map((item: any) => {
                                return (
                                    <Select.Option value={item.key}>
                                        {item.value}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    {/* <Form.Item
                        name="imagePullSecretId"
                        label="镜像拉取证书"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="sideCarPlugins"
                        label="SideCar插件"
                    >
                        <Select allowClear={true}
                            mode="multiple"
                            placeholder="请选择初始容器">
                            {initContainerData.map((item: IInitContainerConfigurationOutputDto) => {
                                return (
                                    <Select.Option value={item.id}>
                                        {item.containerName}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item> */}

                    <Form.Item
                        name="replicas"
                        label="部署副本数量"
                        rules={[{ required: true }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        name={["deploymentPlugins", "strategy", "type"]}
                        label="更新策略类型"
                    >
                        <Select allowClear={true}
                            placeholder="请选择更新策略类型">
                            <Select.Option value="Recreate">Recreate</Select.Option>
                            <Select.Option value="RollingUpdate">RollingUpdate</Select.Option>

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name={["deploymentPlugins", "strategy", "maxUnavailable"]}
                        label="最大不可用">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["deploymentPlugins", "strategy", "maxSurge"]}
                        label="可调度数量">
                        <Input />
                    </Form.Item>
                </Form>
                {/* <Form
                    form={masterContainerConfigurationFormData}
                    name="nest-messages"
                    layout="vertical"
                    validateMessages={validateMessages}
                >
                    <Card title="存活探针配置" size="small" bordered={false}  >

                        <Form.Item
                            name={["readinessProbe", "scheme"]}
                            label="方案"
                        >
                            <Input
                            />
                        </Form.Item>

                        <Form.Item
                            name={["readinessProbe", "path"]}
                            label="路径"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name={["readinessProbe", "port"]}
                            label="端口"
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            name={["readinessProbe", "initialDelaySeconds"]}
                            label="延迟时间"
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            name={["readinessProbe", "periodSeconds"]}
                            label="间隔时间"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Card>
                    <Card title="准备探针配置" size="small" bordered={false}  >

                        <Form.Item
                            name={["liveNessProbe", "scheme"]}
                            label="方案"
                        >
                            <Input
                            />
                        </Form.Item>

                        <Form.Item
                            name={["liveNessProbe", "path"]}
                            label="路径"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name={["liveNessProbe", "port"]}
                            label="端口"
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            name={["liveNessProbe", "initialDelaySeconds"]}
                            label="延迟时间"
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            name={["liveNessProbe", "periodSeconds"]}
                            label="间隔时间"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Card>
                    <Card title="limit资源配置" size="small" bordered={false}  >

                        <Form.Item
                            name={["limits", "cpu"]}
                            label="Cpu"
                        >
                            <Input
                            />
                        </Form.Item>

                        <Form.Item
                            name={["limits", "memory"]}
                            label="Memory"
                        >
                            <Input />
                        </Form.Item>

                    </Card>
                    <Card title="request资源配置" size="small" bordered={false}  >

                        <Form.Item
                            name={["requests", "cpu"]}
                            label="Cpu"
                        >
                            <Input
                            />
                        </Form.Item>

                        <Form.Item
                            name={["requests", "memory"]}
                            label="Memory"
                        >
                            <Input />
                        </Form.Item>

                    </Card>
                    <Form.List name="environments">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'key']}
                                            label="Key："
                                        >
                                            <Input placeholder="请输入Key" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'value']}
                                            label="Value："
                                        >
                                            <Input placeholder="请输入Value" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        添加环境变量
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form> */}

            </Drawer>
        </div>
    )
}
export default Operation;