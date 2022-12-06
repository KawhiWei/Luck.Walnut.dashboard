import { Button, Card, Col, Row } from "antd";
import {
  CheckCircleFilled,
  CloseOutlined,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";
import {
  IApplicationPipelineOutputDto,
  IStageDto,
  IStepDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import { useEffect, useState } from "react";

import { OperationTypeEnum } from "@/shared/operation/operationType";
import SavePipeLine from "./save-pipeline";
import StageOperation from "./stage-operation";
import StepOperation from "./step-operation";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";

interface IProp {
  /**
   * 操作类型
   */
  operationType: OperationTypeEnum;

  /**
   * 流水线信息
   */
  pipelineInfo?: IApplicationPipelineOutputDto;

  /**
   * 应用标识
   */
  appId: string;
}

/***
 * 应用流水线设计
 */
const PipelineStage = (props: IProp) => {
  const [stageList, setStageList] = useState<Array<IStageDto>>([]);
  const [stageOperationElement, setStageOperationElement] = useState<any>(null);
  const [stepOperationElement, setStepOperationElement] = useState<any>(null);
  const [pipelineInfo, setPipelineInfo] =
    useState<IApplicationPipelineOutputDto>();

  useEffect(() => {
    onLoad();
  }, [stageList]);

  const onLoad = () => {
    if (props.pipelineInfo) {
      setPipelineInfo(props.pipelineInfo);
      setStageList(props.pipelineInfo.pipelineScript);
    }
  };
  /**
   * 添加阶段
   */
  const onAddStageModal = () => {
    setStageOperationElement(
      <StageOperation
        onCallbackEvent={clearStageOperationElement}
        onAddStageCallback={onAddStageCallBack}
        operationType={OperationTypeEnum.add}
      />
    );
  };

  /**
   * 添加阶段
   */
  const onAddStageCallBack = (_name: string) => {
    debugger;

    stageList.push({
      name: _name,
      steps: [],
    });
    setStageList((current) => [...current]);
    console.log(stageList);
    clearStageOperationElement();
  };

  /**
   * 清空阶段弹框
   */
  const clearStageOperationElement = () => {
    setStageOperationElement(null);
  };

  /**
   * 修改stage
   */
  const onEditStageModal = (_stage: IStageDto, _stageIndex: number) => {
    setStageOperationElement(
      <StageOperation
        onCallbackEvent={clearStageOperationElement}
        onEditStage={onEditStage}
        operationType={OperationTypeEnum.edit}
        stage={_stage}
        stageIndex={_stageIndex}
      />
    );
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
    clearStageOperationElement();
  };

  /**
   * 删除阶段
   */
  const onRemoveStage = (_stageIndex: number) => {
    stageList.splice(_stageIndex, 1);
    setStageList((current) => [...current]);
  };

  /**
   * 添加步骤
   */
  const onAddStep = (_stageIndex: number) => {
    setStepOperationElement(
      <StepOperation
        appId={props.pipelineInfo ? props.pipelineInfo.appId : ""}
        operationType={OperationTypeEnum.add}
        stageIndex={_stageIndex}
        onCallbackEvent={clearStepOperationElement}
        onAddCallbackEvent={onAddStepCallBack}
      ></StepOperation>
    );
  };

  /**
   * 添加步骤回调事件
   */
  const onAddStepCallBack = (_stageIndex: number, _step: IStepDto) => {
    debugger;
    stageList.filter((item, index) => {
      if (index == _stageIndex) {
        item.steps.push(_step);
      }
    });
    setStageList((current) => [...current]);
    clearStepOperationElement();
  };

  /**
   * 编辑步骤
   */
  const onEditStep = (
    _stageIndex: number,
    _stepIndex: number,
    _step: IStepDto
  ) => {
    setStepOperationElement(
      <StepOperation
        appId={props.pipelineInfo ? props.pipelineInfo.appId : ""}
        operationType={OperationTypeEnum.edit}
        stageIndex={_stageIndex}
        stepIndex={_stepIndex}
        step={_step}
        onCallbackEvent={clearStepOperationElement}
        onEditCallbackEvent={onEditStepCallBack}
      ></StepOperation>
    );
    
  };

  /**
   * 编辑步骤回调事件
   */
  const onEditStepCallBack = (
    _stageIndex: number,
    _stepIndex: number,
    _step: IStepDto
  ) => {
    stageList.filter((stageItem, stageIndex) => {
      if (stageIndex == _stageIndex) {
        stageItem.steps.filter((stepItem, stepIndex) => {
          if (stepIndex == _stepIndex) {
            stepItem.name = _step.name;
            stepItem.content = _step.content;
            stepItem.stepType = _step.stepType;
          }
        });
      }
    });
    setStageList((current) => [...current]);
    console.log(stageList);
    clearStepOperationElement();
  };

  /**
   * 清空步骤弹框
   */
  const clearStepOperationElement = () => {
    setStepOperationElement(null);
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
        appId={props.appId}
        operationType={OperationTypeEnum.edit}
        stageList={stageList}
        onCallbackEvent={clearStageOperationElement}
        pipelineInfo={pipelineInfo}
      />
    );
  };

  return (
    <div>
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
              <Card
                title={stage.name}
                extra={
                  <div>
                    <EditFilled
                      style={{ marginRight: 10, textAlign: "right" }}
                      onClick={() => {
                        onEditStageModal(stage, index);
                      }}
                    />
                    <CloseOutlined
                      style={{ marginBottom: 10, textAlign: "right" }}
                      onClick={() => {
                        onRemoveStage(index);
                      }}
                    />
                  </div>
                }
              >
                {stage.steps.map((step, stepIndex) => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#87d068",
                        paddingTop: 5,
                        borderRadius: 3,
                      }}
                    >
                      <Card style={{ marginBottom: 10, borderRadius: 0 }}>
                        <Row justify="end">
                          <EditFilled
                            style={{ marginRight: 10, textAlign: "right" }}
                            onClick={() => {
                              onEditStep(index, stepIndex, step);
                            }}
                          />
                          <CloseOutlined
                            style={{ marginBottom: 10, textAlign: "right" }}
                            onClick={() => {
                              onRemoveStep(index, stepIndex);
                            }}
                          />
                        </Row>
                        <Row>
                          <CheckCircleFilled
                            style={{ color: "#87d068", marginRight: 5 }}
                          />
                          {step.name}
                        </Row>
                      </Card>
                    </div>
                  );
                })}
                <Card style={{ marginBottom: 10, textAlign: "center" }}>
                  <Button
                    shape="round"
                    style={{ margin: "8px 8px" }}
                    onClick={() => {
                      onAddStep(index);
                    }}
                  >
                    <PlusOutlined />
                    添加步骤
                  </Button>
                </Card>
              </Card>
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
      {stepOperationElement}
    </div>
  );
};

export default PipelineStage;
