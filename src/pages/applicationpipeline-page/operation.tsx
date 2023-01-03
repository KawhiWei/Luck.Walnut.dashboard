import { Spin, message } from "antd";
import { useEffect, useState } from "react";

import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineStage from "./pipeline-stage";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

/**
 * 应用流水线设计
 */
const Operation = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [appId, setAppId] = useState<string>("");
  const [pipelineStageElement, setPipelineStageElement] = useState<any>(null);
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetLoad();
    onGetDetailed();
  }, []);

  /**
   *
   */
  const onGetLoad = () => {
    if (props.location.state.appId) {
      setAppId((_appId) => {
        return props.location.state.appId;
      });
    }
  };

  /**
   *
   */
  const onGetDetailed = () => {
    if (props.location.state.pipelineId) {
      setLoading(true);
      _applicationPipelineService
        .getDetail(props.location.state.pipelineId)
        .then((rep) => {
          console.log(rep);
          if (!rep.success) {
            message.error(rep.errorMessage, 3);
          } else {
            setPipelineStageElement(
              <PipelineStage
                appId={props.location.state.appId}
                operationType={OperationTypeEnum.edit}
                pipelineInfo={rep.result}
              ></PipelineStage>
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setPipelineStageElement(
        <PipelineStage
          appId={props.location.state.appId}
          operationType={OperationTypeEnum.add}
        ></PipelineStage>
      );
    }
  };

  return (
    <div>
      <Spin spinning={loading}>{pipelineStageElement}</Spin>
    </div>
  );
};

export default Operation;
