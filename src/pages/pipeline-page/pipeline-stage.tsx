import { Button, Card, Row } from "antd";
import { useEffect, useState } from "react";

import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import PipelineStep from "./pipeline-step";
import { PlusOutlined } from "@ant-design/icons";

interface IProp {
  /**
   * 阶段信息
   */
  stage: IStageDto;

  /**
   * 添加步骤事件
   */
  onAddStep: any;
  /**
   * 当前的步骤的下标
   */
  stageIndex: number;
}

/***
 * 应用流水线设计
 */
const PipelineStage = (props: IProp) => {
  /**
   * 页面初始化事件
   */
  useEffect(() => {}, [props.stage]);
  const onAddStep = () => {
    props.onAddStep(props.stageIndex);
  };
  return (
    <div>
      <Card title={props.stage.name}>
        {props.stage.steps.map((step, index) => {
          return (
            <div
              style={{
                backgroundColor: "#87d068",
                paddingTop: 5,
                borderRadius: 3,
              }}
            >
              <PipelineStep step={step}></PipelineStep>
            </div>
          );
        })}
        <Card style={{ marginBottom: 10, textAlign: "center" }}>
          <Button
            shape="round"
            style={{ margin: "8px 8px" }}
            onClick={() => {
              onAddStep();
            }}
          >
            <PlusOutlined />
            添加步骤
          </Button>
        </Card>
      </Card>
    </div>
  );
};

export default PipelineStage;
