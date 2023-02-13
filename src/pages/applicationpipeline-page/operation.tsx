import "../drawer.less";

import { Button, Drawer, DrawerProps, Space, Spin, message } from "antd";
import { useEffect, useState } from "react";

import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
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
  const [placement, setPlacement] = useState<DrawerProps['placement']>('top');
  const [pipelineStageElement, setPipelineStageElement] = useState<any>(null);
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    console.log(document.querySelector('.luck-content'))
    debugger
    onGetLoad();
    onGetDetailed();
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

  /**
 * 弹框取消事件
 */
  const onCancel = () => {
    editOperationState(false);
    props.onCallbackEvent && props.onCallbackEvent();
  };

  /**
   *
   */
  const onGetDetailed = () => {
    if (props.pipelineId && props.operationType == OperationTypeEnum.edit) {
      setLoading(true);
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
    }


  };

  return (
    <div id="test">
      <Drawer
        style={{ borderRadius: 6 }}
        // getContainer={() => document.getElementById('test') || document.body}
        getContainer={false}
        width="80%"
        title={
          <div
            style={{
              borderRadius: 10,
            }}
          >
            {operationState.title}
          </div>
        }
        open={operationState.visible}
        footer={
          <Space style={{ float: "right" }}>
            <Button
              shape="round"
              disabled={loading}
              onClick={() => onCancel()}
            >
              取消
            </Button>
            <Button
              shape="round"
              style={{ margin: "0 8px" }}
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              保存
            </Button>
          </Space>}
      >{pipelineStageElement}</Drawer>
    </div>
  );
};

export default Operation;
