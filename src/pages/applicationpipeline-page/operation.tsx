import "../drawer.less";

import { Spin, message } from "antd";
import { useEffect, useState } from "react";

import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineStage from "./pipeline-stage";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;
  /**
   * appId
   */
  appId: string;
  /**
   * Id
   */
  pipelineId?: string;
  /**
   * 操作类型
   */
  operationType: OperationTypeEnum;

}
/**
 * 应用流水线设计
 */
const Operation = (props: IProp) => {
  const [loading, setLoading] = useState<boolean>(false);
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

  };

  /**
   *
   */
  const onGetDetailed = () => {
    setLoading(true);
    if (props.pipelineId && props.operationType == OperationTypeEnum.edit)
      _applicationPipelineService
        .getDetail(props.pipelineId)
        .then((rep) => {
          console.log(rep);
          if (!rep.success) {
            message.error(rep.errorMessage, 3);
          } else {
            setPipelineStageElement(
              <PipelineStage
                appId={props.appId}
                operationType={props.operationType}
                pipelineInfo={rep.result}
              ></PipelineStage>
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });

  };

  return (
    <div>
      <Spin spinning={loading}>{pipelineStageElement}</Spin>
    </div>
  );
};

export default Operation;
