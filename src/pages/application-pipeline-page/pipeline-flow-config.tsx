import "../drawer.less";

import { useEffect, useReducer, useState } from "react";

import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IApplicationPipelineFlowUpdateInputDto, IApplicationPipelineInputDto, IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineFlow from "../pipeline-operation-component-page/pipeline-flow";
import { Button, Row, Space, Spin, message } from "antd";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const initialize: IApplicationPipelineFlowUpdateInputDto = {
  pipelineScript: []
};

/**
 * 应用流水线设计
 */
const PipeFlowConfig = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [applicationPipelineBasicElement, setApplicationPipelineBasicElement] = useState<any>(null);
  const [applicationPipelineId, setApplicationPipelineId] = useState<string>("");
  const [applicationPipeline, setApplicationPipelineStageArray] = useReducer((state: IApplicationPipelineFlowUpdateInputDto, payload: IApplicationPipelineFlowUpdateInputDto) => ({ ...state, ...payload }), initialize);
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetLoad();
  }, []);
  /**
   *
   */
  const onGetLoad = () => {
    if (props.location.state && props.location.state.id) {
      setLoading(true)
      setApplicationPipelineId(props.location.state.id)
      _applicationPipelineService.getDetail(props.location.state.id).then(resp => {
        if (resp.success) {
          setApplicationPipelineStageArray({ pipelineScript: resp.result.pipelineScript })
        }
      }).finally(() => {
        setLoading(false)
      })
    }
  };

  /***
   * 
   */
  const onSetStageArray = (_stageArray: Array<IStageDto>) => {
    setApplicationPipelineStageArray({
      pipelineScript: _stageArray
    });
  };

  /**
  * 清空流水线基础配置抽屉组件
  */
  const clearApplicationPipelineBasicOperation = () => {
    setApplicationPipelineBasicElement(null);
    setLoading(false);
  };

  /**
   * 抽屉确认回调事件，判断是否需要前往流水线配置界面
  * @param _isGotoPipelineConfig 
  * @param _id 
  */
  const ConfirmCallbackEvent = (_isGotoPipelineConfig: boolean, _id: string) => {
    clearApplicationPipelineBasicOperation();
    setLoading(false);
  }

  /**
   * 抽屉确认回调事件，判断是否需要前往流水线配置界面
    */
  const onSave = () => {
    setLoading(true)
    props.location.state.id && _applicationPipelineService.updatePipelineFlow(props.location.state.id, applicationPipeline)
      .then(resp => {
        if (!resp.success) {
          message.error(resp.errorMessage, 3);
        }
        else {
          message.success("保存成功", 3);
          setLoading(false)
        }
      }
      ).finally(() => {
        setLoading(false)
      })
  }

  /**
   * 
   */
  const showApplicationPipelineBasicOperation = () => {
    setLoading(true);
    setApplicationPipelineBasicElement(
      <Operation
        appId=""
        id={applicationPipelineId}
        onConfirmCallbackEvent={ConfirmCallbackEvent}
        onCancelCallbackEvent={clearApplicationPipelineBasicOperation}
        operationType={OperationTypeEnum.edit}
      />
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <Spin spinning={loading}>
        <Row style={{ marginBottom: "10px", backgroundColor: "white", height: "56px", padding: "0px 28px", }}>
          <Row>
            <Space align="center" >
              <Button
                style={{ float: "right" }}
                size="middle"
                type="primary"
                onClick={() => onSave()}
              >
                保存流水线
              </Button>
            </Space>
          </Row>
        </Row>
        <PipelineFlow stageArray={applicationPipeline.pipelineScript} onCallbackEvent={onSetStageArray} onEditPipeLineInformationCallbackEvent={showApplicationPipelineBasicOperation} />
      </Spin>
      {applicationPipelineBasicElement}
    </div>
  );
};

export default PipeFlowConfig;
