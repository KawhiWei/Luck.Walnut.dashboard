import {
  ApplicationLevelMap,
  ApplicationStateMap,
} from "@/domain/maps/application-map";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import {
  IApplicationPipelineOutputDto,
  IApplicationPipelineSaveDto,
  IStageDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import {
  formItemDoubleRankLayout,
  formItemSingleRankLayout,
  tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IComponentIntegrationService } from "@/domain/componentintegration/icomponentintegration-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;
  /**
   * 操作类型
   */
  operationType: OperationTypeEnum;

  /**
   *
   */
  id?: string;

  /**
   *
   */
  stageList: Array<IStageDto>;

  /**
   * 应用标识
   */
  appId: string;

  pipelineInfo?: IApplicationPipelineOutputDto;
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

const SavePipeLine = (props: IProp) => {
  const _componentIntegrationService: IComponentIntegrationService =
    useHookProvider(IocTypes.ComponentIntegrationService);
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });

  const [componentIntegrationArray, setComponentIntegrationArray] = useState<
    Array<any>
  >([]);
  const [formData] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getComponentIntegrationList();
  }, []);
  const onGetLoad = () => {
    switch (props.operationType) {
      case OperationTypeEnum.add:
        editOperationState(true, "添加");
        break;
      case OperationTypeEnum.edit:
        editOperationState(true, "编辑");
        break;
    }
  };

  const getComponentIntegrationList = () => {
    let _param = {
      pageSize: 100,
      pageIndex: 1,
    };
    _componentIntegrationService
      .getPage(_param)
      .then((rep) => {
        if (rep.success) {
          setComponentIntegrationArray(rep.result.data);
        }
      })
      .finally(() => {
        onGetLoad();
      });
  };

  const history = useHistory();
  /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  };
  const onCancel = () => {
    editOperationState(false);
    props.onCallbackEvent && props.onCallbackEvent();
  };
  const onFinish = () => {
    setLoading(true);
    let form = formData.getFieldsValue();
    switch (props.operationType) {
      case OperationTypeEnum.add:
        if (props.appId) {
          var param = {
            appId: props.appId,
            appEnvironmentId: "string",
            name: form.name,
            pipelineState: 0,
            pipelineScript: props.stageList,
            componentIntegrationId: form.componentIntegrationId,
          };

          _applicationPipelineService
            .create(param)
            .then((rep) => {
              if (!rep.success) {
                message.error(rep.errorMessage, 3);
              } else {
                message.success("保存成功", 3);
                history.push({
                  pathname: "/application/dashboard",
                  state: {
                    defaultActiveKey: "2",
                    appId: props.appId,
                  },
                });
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }
        break;
      case OperationTypeEnum.edit:
        // var data = {...props.pipelineInfo, componentIntegrationId:form.componentIntegrationId};
        // data.name = form.name;
        // data.pipelineScript = props.stageList;

        var data = {
          appId: props.pipelineInfo?.appId,
          appEnvironmentId: "string",
          name: form.name,
          pipelineState: 0,
          pipelineScript: props.stageList,
          componentIntegrationId: form.componentIntegrationId,
        };
        _applicationPipelineService
          .update(props.pipelineInfo ? props.pipelineInfo.id : "", data)
          .then((rep) => {
            if (!rep.success) {
              message.error(rep.errorMessage, 3);
            } else {
              message.success("保存成功", 3);
              history.push({
                pathname: "/application/dashboard",
                state: {
                  defaultActiveKey: "2",
                  appId: props.appId,
                },
              });
            }
          })
          .finally(() => {
            setLoading(false);
          });
        break;
    }
  };

  return (
    <div>
      <Modal
        width={1000}
        style={{ borderRadius: 6 }}
        getContainer={false}
        onCancel={onCancel}
        title={
          <div
            style={{
              borderRadius: 10,
            }}
          >
            {operationState.title}
          </div>
        }
        closable={false}
        visible={operationState.visible}
        footer={null}
      >
        <Form
          form={formData}
          {...formItemSingleRankLayout}
          name="nest-messages"
          layout="horizontal"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={{ ...props.pipelineInfo }}
        >
          <Row>
            <Col span="24">
              <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form.Item
                name="componentIntegrationId"
                label="选择流水线组件"
                rules={[{ required: true }]}
              >
                <Select allowClear={true} placeholder="请选择组件类型">
                  {componentIntegrationArray.map((item: any) => {
                    return (
                      <Select.Option value={item.id}>
                        {item.name}——{item.componentLinkTypeName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24" style={{ textAlign: "right" }}>
              <Form.Item {...tailLayout}>
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
                  htmlType="submit"
                >
                  保存
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
export default SavePipeLine;
