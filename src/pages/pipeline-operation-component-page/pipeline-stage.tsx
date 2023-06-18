import "./pipeline-stage.less"

import { Col, Row, } from "antd";
import {
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  IStageDto,
  IStepDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import { useEffect, useState } from "react";

import { OperationTypeEnum } from "@/shared/operation/operationType";
import StageOperation from "./stage-operation";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import TaskList from "./task-list";

interface IProp {
  /**
     * 回调事件
     */
  onCallbackEvent: any;

  /**
   * 
   */
  stageArray: Array<IStageDto>;
}

/***
 * 应用流水线设计
 */
const PipelineFlow = (props: IProp) => {
  const [stageList, setStageList] = useState<Array<IStageDto>>([]);
  const [stageOperationElement, setStageOperationElement] = useState<any>(null);
  const [stepOperationElement, setStepOperationElement] = useState<any>(null);
  const [taskListElement, setTaskListElement] = useState<any>(null);

  useEffect(() => {
    onLoad();
  }, [stageList]);

  const onLoad = () => {
    setStageList(props.stageArray);
  };


  /**
   * 添加阶段
   */
  const onAddStage = () => {
    let name = `阶段-${stageList.length + 1}`
    stageList.push({
      name: name,
      steps: [],
    });
    setStageList((current) => [...current]);
    props.onCallbackEvent(stageList)
  };

  /**
   * 添加阶段
   */
  const onShowStageOperation = () => {
    setStageOperationElement(<StageOperation
      onCallbackEvent={clearStageOperationElement}
      operationType={OperationTypeEnum.add}
    />);

  };
  /**
   * 清空阶段弹框
   */
  const clearStageOperationElement = () => {
    setStageOperationElement(null);
    props.onCallbackEvent && props.onCallbackEvent()
  };

  /**
   * 清空任务列表组件
   */
  const clearTaskListElement = () => {
    setTaskListElement(null)
  }

  /**
 * 删除Stage
 */
  const onShowTaskList = (_stageIndex: number) => {
    setTaskListElement(<TaskList
      stageIndex={_stageIndex}
      onCallbackEvent={clearTaskListElement}
    />)
    setStageList((current) => [...current]);
  };


  /**
   * 删除Stage
   */
  const onRemoveStage = (_stageIndex: number) => {
    stageList.splice(_stageIndex, 1);
    setStageList((current) => [...current]);
  };



  /**
   * 添加阶段
   */
  const onAddStep = (_stageIndex: number) => {
    let name = `阶段-${stageList.length + 1}`
    if (_stageIndex <= 0) {
      let name = `阶段-${stageList.length + 1}`
      let stageName = `阶段-${stageList.length + 1}`;
      let stage: IStageDto = {
        name: stageName,
        steps: [{
          name: name,
          stepType: StepTypeEnum.buildImage,
          content: ""
        }],
      }
      stageList.push(stage);

    }
    else {
      stageList.filter((item, index) => {
        if (index === _stageIndex) {
          item.steps.push({
            name: name,
            stepType: StepTypeEnum.buildImage,
            content: ""
          });
        }
        return item;
      });
    }

    setStageList((current) => [...current]);
    props.onCallbackEvent(stageList)
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
    let currentStage = stageList[_stageIndex];
    if (currentStage && currentStage.steps.length <= 0) {
      stageList.splice(_stageIndex, 1);
    }

    setStageList((current) => [...current]);
    props.onCallbackEvent(stageList)
  };

  return (
    <div className="pipeline-flow">
      <div className="pipeline-flow-content">
        <div className="pipeline-flow-groups-container">
          <div className="pipeline-flow-groups">

            {stageList.map(
              (stage: IStageDto, stageIndex) => {
                return (
                  <div className="flow-group-content">
                    <div className="flow-group-split-line">
                      <div className="flow-group-split-line-button">
                      </div>
                    </div>
                    <div className="flow-group">
                      <div className="group-head">
                        <div className="editable-label">
                          <span className="group-head-title">{stage.name}</span>
                          <span className="group-head-title"><FormOutlined /></span>
                          <span className="group-head-title"><DeleteOutlined onClick={() => onRemoveStage(stageIndex)} style={{ color: "red" }} /></span>
                        </div>
                      </div>

                      {
                        stage.steps.map((step: IStepDto, stepIndex) => {
                          return (<div className="flow-job-step-container">
                            <div className="flow-job-content">
                              <span className="flow-job-content-title">代码扫描</span>
                              <span className="flow-job-content-title"><FormOutlined /></span>
                              <span className="flow-job-content-title"><DeleteOutlined onClick={() => onRemoveStep(stageIndex, stepIndex)} style={{ color: "red" }} /></span>
                            </div>
                          </div>)
                        })
                      }

                      <div className="flow-job-step-container">
                        <div className="flow-job-step-container-create" onClick={() => onShowTaskList(stageIndex)}>
                          <span className="flow-job-container-create-title">新的步驟</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}

            <div className="flow-group-content flow-group-create">
              <div className="flow-group-split-line">
                <div className="flow-group-split-line-button">
                </div>
              </div>
              <div className="flow-group">
                <div className="group-head">
                  <div className="editable-label">
                    <span className="group-head-title">新阶段</span>
                  </div>
                </div>
                <div className="steps">
                  <div className="flow-job-content flow-job-content-create" onClick={() => onShowTaskList(-1)}>
                    <span className="flow-job-create-title"><PlusCircleOutlined /></span>
                    <span className="flow-job-create-title">新的任务</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {stageOperationElement}
      {taskListElement}
    </div>
  );
};

export default PipelineFlow;
