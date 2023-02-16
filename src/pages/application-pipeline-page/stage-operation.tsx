import { Button, Card, Col, Form, Input, Modal, Row, Spin } from "antd";
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
   * 新增阶段事件回调
   */
  onAddStageCallback?: any;

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
  stage?: IStageDto;

  /**
   * 编辑阶段事件回调
   */
  onEditStage?: any;

  /**
   * 下标
   */
  stageIndex?: number;
}

/***
 * 步骤添加和编辑弹框
 */
const StageOperation = (props: IProp) => {
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

  const [formData] = Form.useForm();
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetLoad();
  }, [formData]);

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
        formData.setFieldsValue({
          name:"新建阶段",
          steps:[]
        });
        editOperationState(true, "添加阶段");
        break;
      case OperationTypeEnum.view:
        editOperationState(true, "查看阶段");
        break;
      case OperationTypeEnum.edit:
        props.stage && formData.setFieldsValue(props.stage);
        editOperationState(true, "添加阶段");
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
    let param = formData.getFieldsValue();
    switch (props.operationType) {
      case OperationTypeEnum.add:
        props.onAddStageCallback && props.onAddStageCallback(param.name);
        break;
      case OperationTypeEnum.view:
        editOperationState(true, "查看");
        break;
      case OperationTypeEnum.edit:
        (props.onEditStage || props.stageIndex) &&
          props.onEditStage(props.stageIndex, param.name);
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
            <Col span="24" style={{ textAlign: "right" }}>
              <Form.Item {...tailLayout}>
                <Button shape="round" onClick={() => onCancel()}>
                  取消
                </Button>
                <Button
                  shape="round"
                  style={{ margin: "0 8px" }}
                  type="primary"
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

export default StageOperation;
