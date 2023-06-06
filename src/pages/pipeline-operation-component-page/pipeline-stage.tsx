import "./pipeline-stage.less"

import { Button, Card, Col, Drawer, Row } from "antd";
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
import StageOperation from "./stage-operation";
import StepOperation from "./step-operation";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
     * 操作成功回调事件
     */
  onCallbackEvent?: any;

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
    onLoad();
  }, [stageList]);

  const onLoad = () => {
    setStageList(props.stageArray);
  };

  return (
    <div className="pipeline">
      <Row gutter={16} wrap={false}>
        {stageList.map((stage: IStageDto, index) => {
          return (
            <Col span={6}>
              <div className="stage-wrapper">
                <div className="stage-box">
                  <div className="stage-index">
                    1-1
                  </div>
                  <div className="stage-name">
                    {stage.name}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
        <div className="stage-wrapper">
          <div className="stage-box">
            <div className="stage-root"
              onClick={() => {
                console.log("添加阶段")
              }}>
              <PlusOutlined /> 增加阶段
            </div>
          </div>
        </div>
      </Row>
      {stageOperationElement}
      {stepOperationElement}
    </div>
  );
};

export default PipelineStage;
