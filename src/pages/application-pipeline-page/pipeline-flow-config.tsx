import "../drawer.less";

import { useEffect, useState } from "react";

import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineFlow from "../pipeline-operation-component-page/pipeline-flow";
import { message } from "antd";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

/**
 * 应用流水线设计
 */
const PipeFlowConfig = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pipelineStageElement, setPipelineStageElement] = useState<any>(null);
  const [applicationPipelineBasicElement, setApplicationPipelineBasicElement] = useState<any>(null);
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetLoad();
  }, []);
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
   *
   */
  const onGetLoad = () => {
    switch (props.operationType) {
      case OperationTypeEnum.add:
        editOperationState(true, "添加");
        break;
      case OperationTypeEnum.view:
        editOperationState(true, "查看");
        break;
      case OperationTypeEnum.edit:
        props.pipelineId && editOperationState(true, "修改");
        break;
    }

  };
  const onSetStageArray = (_stageArray: Array<IStageDto>) => {
    // console.log(_stageArray)
  };

  /**
  * 清空流水线基础配置抽屉组件
  */
  const clearApplicationPipelineBasicOperation = () => {
    setApplicationPipelineBasicElement(null);
  };

  /**
 * 抽屉确认回调事件，判断是否需要前往流水线配置界面
 * @param _isGotoPipelineConfig 
 * @param _id 
 */
  const ConfirmCallbackEvent = (_isGotoPipelineConfig: boolean, _id: string) => {


  }

  /**
   * 
   */
  const showApplicationPipelineBasicOperation = () => {
    setApplicationPipelineBasicElement(
      <Operation
        appId={props.appId}
        id={""}
        onConfirmCallbackEvent={ConfirmCallbackEvent}
        onCancelCallbackEvent={clearApplicationPipelineBasicOperation}
        operationType={OperationTypeEnum.edit}
      />
    );
  };



  return (
    <div style={{ height: "100%" }}>
      <PipelineFlow stageArray={[]} onCallbackEvent={onSetStageArray} onEditPipeLineInformationCallbackEvent={showApplicationPipelineBasicOperation} />
      {applicationPipelineBasicElement}
    </div>
  );
};

export default PipeFlowConfig;
