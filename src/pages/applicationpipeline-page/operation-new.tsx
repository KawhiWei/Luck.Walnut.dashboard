import { Button, Card, Col, Modal, Row, Spin } from "antd";
import { useEffect, useState } from "react";

import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineStage from "./pipeline-stage";
import { PlusOutlined } from "@ant-design/icons";
import SavePipeLine from "./save-pipeline";
import StageOperation from "./stage-operation";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";

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
   * 应用Id
   */
  appId: string;
}
/**
 * 应用流水线设计
 */
const OperationNew = (props: IProp) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [appId, setAppId] = useState<string>();
  const [stageOperationElement, setStageOperationElement] = useState<any>(null);
  const [stageList, setStageList] = useState<Array<IStageDto>>([]);
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });

  /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  };
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onLoad();
  }, [stageList]);

  /**
   * 弹框取消事件
   */
  const onCancel = () => {
    editOperationState(false);
    props.onCallbackEvent && props.onCallbackEvent();
  };
  const onAddStageModal = () => {
    setStageOperationElement(
      <StageOperation
        onCallbackEvent={clearElement}
        onAddStageCallback={onAddStage}
        operationType={OperationTypeEnum.add}
      />
    );
  };

  const clearElement = () => {
    setStageOperationElement(null);
  };

  /**
   * 添加阶段
   */
  const onAddStage = (_name: string) => {
    setStageList((current) => [
      ...current,
      {
        name: _name,
        steps: [],
      },
    ]);
    clearElement();
  };

  /**
   * 修改阶段
   */
  const onEditStage = (_stageIndex: number, _name: string) => {
    stageList.filter((item, index) => {
      if (index === _stageIndex) {
        item.name = _name;
      }
    });
    setStageList((current) => [...current]);
    clearElement();
  };

  /**
   * 删除步骤
   */
  const onEditStageModal = (_stage: IStageDto, _stageIndex: number) => {
    setStageOperationElement(
      <StageOperation
        onCallbackEvent={clearElement}
        onEditStage={onEditStage}
        operationType={OperationTypeEnum.edit}
        stage={_stage}
        stageIndex={_stageIndex}
      />
    );
  };

  /**
   * 添加步骤
   */
  const onAddStep = (_stageIndex: number) => {
    stageList.filter((item, index) => {
      if (index == _stageIndex) {
        item.steps.push({
          name: "asdasdas",
          stepType: StepTypeEnum.pullCode,
          content: "asdasdasdasdasdasdasdasdasdasdas",
        });
      }
    });
    setStageList((current) => [...current]);
  };

  /**
   * 删除阶段
   */
  const onRemoveStage = (_stageIndex: number) => {
    stageList.splice(_stageIndex, 1);
    setStageList((current) => [...current]);
  };

  /**
   * 删除步骤
   */
  const onRemoveStep = (_stageIndex: number, _stepIndex: number) => {
    stageList.filter((item, index) => {
      if (index === _stageIndex) {
        item.steps.splice(_stepIndex, 1);
      }
    });
    setStageList((current) => [...current]);
  };
  /**
   * 保存
   */
  const onSave = () => {
    setStageOperationElement(
      <SavePipeLine
        appId={appId}
        operationType={OperationTypeEnum.add}
        stageList={stageList}
        onCallbackEvent={clearElement}
      />
    );
  };
  /**
   *
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
    }
  };

  return (
    <div>
      <Modal
        width={1400}
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
        <Spin spinning={loading}>
          <Row>
            <Col span="24" style={{ textAlign: "right", minWidth: 270 }}>
              <Button
                shape="round"
                type="primary"
                style={{ margin: "8px 8px" }}
                onClick={() => {
                  onSave();
                }}
              >
                <PlusOutlined />
                保存流水线
              </Button>
            </Col>
          </Row>
          <Row gutter={16} wrap={false}>
            {stageList.map((stage: IStageDto, index) => {
              return (
                <Col span={4}>
                  <PipelineStage
                    onAddStep={onAddStep}
                    onRemoveStage={onRemoveStage}
                    onRemoveStep={onRemoveStep}
                    stageIndex={index}
                    onEditStage={onEditStageModal}
                    stage={stage}
                  />
                </Col>
              );
            })}
            <Col span={4}>
              <Card style={{ marginBottom: 10, textAlign: "center" }}>
                <Button
                  shape="round"
                  style={{ margin: "8px 8px" }}
                  onClick={() => {
                    onAddStageModal();
                  }}
                >
                  <PlusOutlined />
                  添加阶段
                </Button>
              </Card>
            </Col>
          </Row>
          {stageOperationElement}
        </Spin>
      </Modal>
    </div>
  );
};

export default OperationNew;
