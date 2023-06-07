import "./pipeline-stage.less"

import { Col, Row } from "antd";
import {
  IStageDto,
  IStepDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import { useEffect, useState } from "react";

import {
  PlusOutlined,
} from "@ant-design/icons";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";

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
const PipelineStage = (props: IProp) => {
  const [stageList, setStageList] = useState<Array<IStageDto>>([]);
  const [stageOperationElement, setStageOperationElement] = useState<any>(null);
  const [stepOperationElement, setStepOperationElement] = useState<any>(null);

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
  const onAddStep = (_stageIndex: number, _step: IStepDto) => {
    let name = `阶段-${stageList.length + 1}`
    stageList.filter((item, index) => {
      if (index === _stageIndex) {
        item.steps.push(_step);
      }
      return item;
    });
    setStageList((current) => [...current]);
    props.onCallbackEvent(stageList)
  };

  /**
   * 添加阶段
   */
  const onAddStepShowSelect = (_stageIndex: number) => {
    onAddStep(_stageIndex, {
      name: "测试",
      stepType: StepTypeEnum.buildImage,
      content: ""
    })
  };


  return (
    <div className="pipeline">
      <Row gutter={16} wrap={false}>
        {stageList.map((stage: IStageDto, _stageIndex) => {
          return (
            <Col span={4}>
              <div className="stage-wrapper">
                <div className="stage-box">
                  <div className="stage-index">
                    {_stageIndex + 1}
                  </div>
                  <div className="stage-name">
                    {stage.name}
                  </div>
                </div>
                {stage.steps.map((_step: IStepDto, _stepIndex) => {
                  return (
                    <div className="step-wrapper" onClick={() => { }}
                    >
                      <div className="step-box">
                        {/* <div className="step-box-icon">
                        <PlusOutlined />
                        </div> */}
                        <PlusOutlined />
                        <div className="step-box-name"> {_step.name}</div>
                      </div>

                    </div>
                  )
                })}

                <div className="stage-add-step" onClick={() => onAddStepShowSelect(_stageIndex)}
                >
                  添加步骤
                </div>
              </div>
            </Col>
          );
        })}
        <Col span={4}>
          <div className="stage-wrapper">
            <div className="stage-box">
              <div className="stage-root"
                onClick={() => onAddStage()}>
                <PlusOutlined /> 增加阶段
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {stageOperationElement}
      {stepOperationElement}
    </div>
  );
};

export default PipelineStage;
