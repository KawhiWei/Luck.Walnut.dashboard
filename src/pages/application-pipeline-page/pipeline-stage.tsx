import { Button, Card, Col, Row } from "antd";
import {
  CheckCircleFilled,
  CloseOutlined,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";
import {
  IApplicationBaseDto,
  IApplicationDto,
} from "@/domain/applications/application-dto";
import {
  IApplicationPipelineOutputDto,
  IStageDto,
  IStepDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IBuildImageService } from "@/domain/buildimages/ibuildimage-service";
import { IBuildImageVersionBaseDto } from "@/domain/buildimages/buildimage-dto";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import SavePipeLine from "./save-pipeline";
import StageOperation from "./stage-operation";
import StepOperation from "./step-operation";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

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

  const [buildImageVersionArray, setBuildImageVersionArray] = useState<
    Array<IBuildImageVersionBaseDto>
  >([]);
  const [applicationData, setApplicationData] = useState<IApplicationDto>();
  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );

  useEffect(() => {
    onGetLoadApplication();
    onLoad();
  }, [stageList]);

  const onLoad = () => {
    if (props.pipelineInfo) {
      setPipelineInfo(props.pipelineInfo);
      setStageList(props.pipelineInfo.pipelineScript);
    }
  };

  /**
   *
   */
  const onGetLoadApplication = () => {
    _applicationService
      .getApplicationDashboardDetail(props.appId)
      .then((rep) => {
        if (rep.success) {
          setApplicationData(rep.result.application);
          setBuildImageVersionArray(rep.result.buildImageVersionList);
        }
      });
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
    stageList.push({
      name: _name,
      steps: [],
    });
    setStageList((current) => [...current]);
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
      return item;
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
        buildImageVersionList={buildImageVersionArray}
        appId={props.pipelineInfo ? props.pipelineInfo.appId : ""}
        operationType={OperationTypeEnum.add}
        stageIndex={_stageIndex}
        onCallbackEvent={clearStepOperationElement}
        applicationData={applicationData}
        onAddCallbackEvent={onAddStepCallBack}
      ></StepOperation>
    );
  };

  /**
   * 添加步骤回调事件
   */
  const onAddStepCallBack = (_stageIndex: number, _step: IStepDto) => {
    stageList.filter((item, index) => {
      if (index === _stageIndex) {
        item.steps.push(_step);
      }
      return item;
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
        buildImageVersionList={buildImageVersionArray}
        appId={props.pipelineInfo ? props.pipelineInfo.appId : ""}
        operationType={OperationTypeEnum.edit}
        stageIndex={_stageIndex}
        stepIndex={_stepIndex}
        step={_step}
        applicationData={applicationData}
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
      if (stageIndex === _stageIndex) {
        stageItem.steps.filter((stepItem, stepIndex) => {
          if (stepIndex === _stepIndex) {
            stepItem.name = _step.name;
            stepItem.content = _step.content;
            stepItem.stepType = _step.stepType;
          }
          return stepItem;
        });
      }
      return stageItem;
    });
    setStageList((current) => [...current]);
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
      return item;
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
        operationType={props.operationType}
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
