import { Card } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { IStepDto } from "@/domain/applicationpipelines/applicationpipeline-dto";

interface IProp {
  /**
   * 步骤信息
   */
  step: IStepDto;
}

/***
 * Step组件
 */
const PipelineStep = (props: IProp) => {
  return (
    <Card style={{ marginBottom: 10, borderRadius: 0 }}>
      <CheckCircleFilled style={{ color: "#87d068", marginRight: 5 }} />
      {props.step.name}
    </Card>
  );
};

export default PipelineStep;
