import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Steps,
} from "antd";
import {
  formItemSingleRankLayout,
  tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IStepDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import { StepTypeMap } from "@/domain/applicationpipelines/steptype-map";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 新增步骤事件回调
   */
  onAddStep?: any;

  /**
   * 回调事件
   */
  onCallbackEvent: any;

  /**
   * 操作类型
   */
  operationType: OperationTypeEnum;

  /**
   * 编辑数据
   */
  step?: IStepDto;

  /**
   * 添加步骤事件回调
   */
  onAddCallbackEvent?: any;

  /**
   * 编辑步骤事件回调
   */
  onEditCallbackEvent?: any;

  /**
   * 下标
   */
  stageIndex: number;

  /**
   * 代码仓库地址
   */
  appId: string;

  /**
   * 当前编辑步骤的下标
   */
  stepIndex?: number;
}

const items = [
  {
    title: "步骤类型",
    description: "",
  },
  {
    title: "步骤信息设置",
    description: "",
  },
];
/***
 * 步骤添加和编辑弹框
 */
const StepOperation = (props: IProp) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const [loading, setLoading] = useState<boolean>(false);
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
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });
  const [currentStep, setCurrentStep] = useState<IStepDto>({
    content: "",
    stepType: StepTypeEnum.pullCode,
    name: "",
  });

  const [formData] = Form.useForm();
  const [pullCodeFormData] = Form.useForm();
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetLoad();
  }, [currentStepIndex]);

  /**
   * 弹框取消事件
   */
  const onCancel = () => {
    editOperationState(false);
    props.onCallbackEvent();
  };

  /**
   * 编辑获取一个表单
   * @param _id
   */
  const onGetLoad = () => {
    switch (props.operationType) {
      case OperationTypeEnum.add:
        editOperationState(true, "添加步骤");
        break;
      case OperationTypeEnum.view:
        editOperationState(true, "查看步骤");
        break;
      case OperationTypeEnum.edit:
        if (props.step) {
          formData.setFieldsValue(props.step);
          editOperationState(true, "编辑步骤");
        }
        break;
    }
  };

  /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  };

  /**
   * 底部栏OK事件
   */
  const onFinish = () => {
    let content = "";
    switch (currentStep.stepType) {
      case StepTypeEnum.pullCode:
        content = JSON.stringify(pullCodeFormData.getFieldsValue());
        break;
    }

    setCurrentStep((current) => {
      current.content = content;
      return current;
    });
    console.log(currentStep);
    switch (props.operationType) {
      case OperationTypeEnum.add:
        props.onAddCallbackEvent &&
          props.onAddCallbackEvent(props.stageIndex, currentStep);
        break;
      case OperationTypeEnum.view:
        editOperationState(true, "查看");
        break;
      case OperationTypeEnum.edit:
        props.onEditCallbackEvent &&
          props.onEditCallbackEvent(
            props.stageIndex,
            props.stepIndex,
            currentStep
          );
        break;
    }
  };
  /**
   * 步骤选择组件下一步
   */
  const onNext = () => {
    let param = formData.getFieldsValue();
    setCurrentStep((current) => {
      current.name = param.name;
      current.stepType = param.stepType;
      return current;
    });
    setLoading(true);
    switch (currentStep.stepType) {
      case 1:
        _applicationService
          .getApplicationDashboardDetail(props.appId)
          .then((rep) => {
            if (rep.success) {
              let data = {
                git: rep.result.application.codeWarehouseAddress,
              };
              pullCodeFormData.setFieldsValue(data);
              setCurrentStepIndex(currentStepIndex + 1);
            }
          });
        break;
    }
    setLoading(false);
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
        open={operationState.visible}
        footer={null}
      >
        <Steps
          current={currentStepIndex}
          size="small"
          progressDot
          items={items}
        />
        {currentStepIndex == 0 ? (
          <Form
            form={formData}
            {...formItemSingleRankLayout}
            name="nest-messages"
            layout="horizontal"
            onFinish={onNext}
            validateMessages={validateMessages}
          >
            <Row>
              <Col span="24">
                <Form.Item
                  name="name"
                  label="阶段名称："
                  rules={[{ required: true }]}
                >
                  <Input style={{ borderRadius: 6 }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Form.Item
                  name="stepType"
                  label="阶段类型："
                  rules={[{ required: true }]}
                >
                  <Select allowClear={true} placeholder="请选择步骤类型">
                    {StepTypeMap.map((item: any) => {
                      return (
                        <Select.Option value={item.key}>
                          {item.value}
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
                  <Button shape="round" onClick={() => onCancel()}>
                    取消
                  </Button>
                  <Button
                    shape="round"
                    style={{ margin: "0 8px" }}
                    type="primary"
                    loading={loading}
                    htmlType="submit"
                  >
                    下一步
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : null}
        {currentStepIndex == 1 &&
        currentStep.stepType == StepTypeEnum.pullCode ? (
          <Form
            form={pullCodeFormData}
            {...formItemSingleRankLayout}
            name="nest-messages"
            layout="horizontal"
            onFinish={onNext}
            validateMessages={validateMessages}
          >
            <Row>
              <Col span="24">
                <Form.Item
                  name="git"
                  label="拉取代码："
                  rules={[{ required: true }]}
                >
                  <Input style={{ borderRadius: 6 }} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Form.Item
                  name="branch"
                  label="分支："
                  rules={[{ required: true }]}
                >
                  <Input style={{ borderRadius: 6 }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span="24" style={{ textAlign: "right" }}>
                <Form.Item {...tailLayout}>
                  <Button shape="round" onClick={() => onCancel()}>
                    取消
                  </Button>
                  <Button
                    shape="round"
                    style={{ margin: "0 8px" }}
                    type="primary"
                    onClick={() => onFinish()}
                  >
                    保存
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : null}
      </Modal>
    </div>
  );
};

export default StepOperation;
