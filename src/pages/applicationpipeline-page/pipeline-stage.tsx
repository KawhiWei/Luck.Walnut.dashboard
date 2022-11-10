import { Button, Card, Row } from "antd";
import {
  CheckCircleFilled,
  CloseOutlined,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";

import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { useEffect } from "react";

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

  /**
   * 编辑阶段
   */
  onEditStage: any;

  /**
   * 删除步骤事件
   */
  onRemoveStep: any;

  /**
   * 删除阶段
   */
  onRemoveStage: any;
}

/***
 * 应用流水线设计
 */
const PipelineStage = (props: IProp) => {
  const onAddStep = () => {
    props.onAddStep(props.stageIndex);
  };
  return (
    <div>
      <Card
        title={props.stage.name}
        extra={
          <div>
            <EditFilled
              style={{ marginRight: 10, textAlign: "right" }}
              onClick={() => {
                props.onEditStage(props.stage, props.stageIndex);
              }}
            />
            <CloseOutlined
              style={{ marginBottom: 10, textAlign: "right" }}
              onClick={() => {
                props.onRemoveStage(props.stageIndex);
              }}
            />
          </div>
        }
      >
        {props.stage.steps.map((step, index) => {
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
                  <CloseOutlined
                    style={{ marginBottom: 10, textAlign: "right" }}
                    onClick={() => {
                      props.onRemoveStep(props.stageIndex, index);
                    }}
                  />
                </Row>
                <Row>
                  <CheckCircleFilled
                    style={{ color: "#87d068", marginRight: 5 }}
                  />
                  {step.name}--{props.stageIndex}
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
