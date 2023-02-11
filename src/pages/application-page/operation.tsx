import "../drawer.less";

import {
  ApplicationLevelMap,
  ApplicationStateMap,
} from "@/domain/applications/application-map";
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import {
  formItemDoubleRankLayout,
  formItemSingleRankLayout,
  tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import TextArea from "antd/lib/input/TextArea";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;
  /**
   * Id
   */
  id?: string;
  /**
   * 操作类型
   */
  operationType: OperationTypeEnum;
  /**
   * 项目列表
   */
  projectArray: Array<any>;

  /**
   * 
   */
  componentIntegrationArray: Array<any>;

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
  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });
  const [formData] = Form.useForm();
  const projectArray = props.projectArray;
  const [languageArray, setLanguageArray] = useState<Array<any>>([]);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('top');
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onLoad();
    getLanguageList();
  }, [formData]);

  /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  };
  const getLanguageList = () => {
    _applicationService.getLanguageList().then((rep) => {
      if (rep.success) {
        setLanguageArray(rep.result);
      }
    });
  };

  /**
   * 编辑获取一个表单
   * @param _id
   */
  const onLoad = () => {
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
          _applicationService.getDetail(props.id).then((rep) => {
            if (rep.success) {
              formData.setFieldsValue(rep.result.application);
              editOperationState(true, "修改");
            } else {
              message.error(rep.errorMessage, 3);
            }
          });
        break;
    }
  };

  /**
   * 弹框取消事件
   */
  const onCancel = () => {
    editOperationState(false);
    props.onCallbackEvent && props.onCallbackEvent();
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
    _applicationService
      .addApplication(_param)
      .then((rep) => {
        if (!rep.success) {
          message.error(rep.errorMessage, 3);
        } else {
          message.success("保存成功", 3);
          props.onCallbackEvent && props.onCallbackEvent();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onUpdate = (_param: any) => {
    props.id &&
      _applicationService
        .update(props.id, _param)
        .then((rep) => {
          if (!rep.success) {
            message.error(rep.errorMessage, 3);
          } else {
            message.success("保存成功", 3);
            props.onCallbackEvent && props.onCallbackEvent();
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <div>
      <Drawer
        style={{ borderRadius: 6 }}
        getContainer={false}
        key={placement}
        placement={placement}
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
              htmlType="submit"
            >
              保存
            </Button>
          </Space>}
      >
        <Form
          form={formData}
          {...formItemDoubleRankLayout}
          name="nest-messages"
          layout="horizontal"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Row>
            <Col span="12">
              <Form.Item
                name="appId"
                label="应用唯一标识："
                rules={[{ required: true }]}
              >
                <Input
                  style={{ borderRadius: 6 }}
                  disabled={props.operationType === OperationTypeEnum.edit}
                />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                name="englishName"
                label="应用英文名"
                rules={[{ required: true }]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                name="chineseName"
                label="应用中文名："
                rules={[{ required: true }]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                name="projectId"
                label="所属项目："
                rules={[{ required: true }]}
              >
                <Select allowClear={true} placeholder="请选择项目">
                  {projectArray.map((item: any) => {
                    return (
                      <Select.Option value={item.id}>{item.name}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                name="applicationState"
                label="应用状态："
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: 180 }}
                  allowClear={true}
                  placeholder="请选择应用状态"
                >
                  {ApplicationStateMap.map((item: any) => {
                    return (
                      <Select.Option value={item.key}>
                        {item.value}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                name="developmentLanguage"
                label="应用开发语言："
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: 180 }}
                  allowClear={true}
                  placeholder="请选择应用开发语言"
                >
                  {languageArray.map((item: any) => {
                    return (
                      <Select.Option value={item.id}>{item.name}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                name="applicationLevel"
                label="应用等级："
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: 180 }}
                  allowClear={true}
                  placeholder="请选择应用等级"
                >
                  {ApplicationLevelMap.map((item: any) => {
                    return (
                      <Select.Option value={item.key}>
                        {item.value}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                name="departmentName"
                label="所属部门："
                rules={[{ required: true }]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                name="principal"
                label="负责人："
                rules={[{ required: true }]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item name="codeWarehouseAddress" label="代码仓库地址：">
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                name="buildImageId"
                label="基础构建镜像："
                rules={[{ required: true }]}
              >
              </Form.Item>


            </Col>
            <Col span="12">
              <Form.Item
                name="imageWarehouseId"
                label="镜像推送仓库：">
                <Select
                  style={{ width: 180 }}
                  allowClear={true}
                  placeholder="请选择镜像推送仓库"
                >
                  {props.componentIntegrationArray.map((item: any) => {
                    return (
                      <Select.Option value={item.id}>
                        {item.componentCategoryName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item name="describe" label="应用描述：">
                <TextArea style={{ borderRadius: 6 }} rows={14}></TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};
export default Operation;
