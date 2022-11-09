import { Button, Card, Row } from "antd";
import {
  CheckCircleFilled,
  CloseOutlined,
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
   * 删除步骤事件
   */
  onRemoveStep: any;

  onRemoveStage: any;
}

/***
 * 应用流水线设计
 */
const PipelineStage = (props: IProp) => {
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    console.log(props);
  });
  const onAddStep = () => {
    props.onAddStep(props.stageIndex);
  };
  return (
    <div>
      <Card
        title={props.stage.name}
        extra={
          <CloseOutlined
            style={{ marginBottom: 10, textAlign: "right" }}
            onClick={() => {
              props.onRemoveStage(props.stageIndex);
            }}
          />
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
                <Row>
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
