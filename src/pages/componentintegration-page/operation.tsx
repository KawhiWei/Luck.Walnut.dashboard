import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SettingTwoTone,
  WarningOutlined,
} from "@ant-design/icons";
import {
  formItemSingleRankLayout,
  searchFormItemDoubleRankLayout,
  tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IComponentIntegrationService } from "@/domain/componentintegration/icomponentintegration-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * Id
   */
  id?: string;

  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;

  /**
   * 操作类型
   */
  operationType: OperationTypeEnum;
  /**
   * 组件集成类型枚举
   */
  componentLinkTypeArray: Array<any>;
}

const Operation = (props: IProp) => {
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });
  const _componentIntegrationService: IComponentIntegrationService =
    useHookProvider(IocTypes.ComponentIntegrationService);

  const [formData] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetLoad();
  }, [formData]);

  /**
   *
   */
  const onGetLoad = () => {
    switch (props.operationType) {
      case OperationTypeEnum.add:
        editOperationState(true, "添加");
        // formData.setFieldsValue(initformData);
        break;
      case OperationTypeEnum.view:
        editOperationState(true, "查看");
        break;
      case OperationTypeEnum.edit:
        props.id &&
          _componentIntegrationService.getDetail(props.id).then((rep) => {
            console.log(rep);
            if (rep.success) {
              formData.setFieldsValue(rep.result);
              editOperationState(true, "修改");
            }
          });
        break;
    }
  };
  /**
   * 底部栏OK事件
   */
  const onFinish = () => {
    let param = formData.getFieldsValue();
    switch (props.operationType) {
      case OperationTypeEnum.add:
        onAdd(param);
        break;
      case OperationTypeEnum.edit:
        onUpdate(param);
        break;
    }
  };

  const onAdd = (_param: any) => {
    setLoading(true);
    _componentIntegrationService.add(_param).then((rep) => {
      if (!rep.success) {
        message.error(rep.errorMessage, 3);
      } else {
        message.success("保存成功", 3);
        props.onCallbackEvent && props.onCallbackEvent();
      }
      setLoading(false);
    });
  };

  const onUpdate = (_param: any) => {
    props.id &&
      _componentIntegrationService.update(props.id, _param).then((rep) => {
        if (!rep.success) {
          message.error(rep.errorMessage, 3);
        } else {
          message.success("保存成功", 3);
          props.onCallbackEvent && props.onCallbackEvent();
        }
      });
  };

  /**
   * 弹框取消事件
   */
  const onCancel = () => {
    editOperationState(false);
    props.onCallbackEvent && props.onCallbackEvent();
  };

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

  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  };

  return (
    <div>
      <Modal
        width={1000}
        getContainer={false}
        title={operationState.title}
        closable={true}
        visible={operationState.visible}
        footer={null}
        onCancel={onCancel}
      >
        <Form
          {...formItemSingleRankLayout}
          form={formData}
          name="nest-messages"
          layout="horizontal"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Row>
            <Col span="24">
              <Form.Item
                name="name"
                label="集成名称："
                rules={[{ required: true }]}
              >
                <Input
                  style={{ borderRadius: 6 }}
                  disabled={props.operationType === OperationTypeEnum.edit}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form.Item
                name="componentLinkType"
                label="组件类型："
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  {props.componentLinkTypeArray.map((item: any) => {
                    return <Radio value={item.key}>{item.value}</Radio>;
                  })}
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form.Item
                name="componentLinkUrl"
                label="链接地址:"
                rules={[{ required: true }, { type: 'url' }]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span="24">
              <Form.Item
                name="userName"
                label="用户名:"
                rules={[{ required: true }]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form.Item
                name="passWord"
                label="密码："
                rules={[{ required: true }]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form.Item
                name="token"
                label="Token："
                rules={[{ required: true }]}
              >
                <Input style={{ borderRadius: 6 }} />
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
export default Operation;
