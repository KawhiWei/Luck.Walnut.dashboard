import { Button, Card, Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";

import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineStage from "./pipeline-stage";
import { PlusOutlined } from "@ant-design/icons";
import StageOperation from "./stage-operation";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import { IocTypes } from "@/shared/config/ioc-types";
import SaveOperation from "./SaveOperation";

/**
 * 应用流水线设计
 */
const Operation = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stageOperationElement, setStageOperationElement] = useState<any>(null);
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);
  const [stageList, setStageList] = useState<Array<IStageDto>>([
    {
      name: "拉取代码",
      steps: [
        {
          name: "拉取代码",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
        {
          name: "覆盖率检查",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
        {
          name: "镜像构建",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
      ],
    },
    {
      name: "测试阶段",
      steps: [
        {
          name: "漏洞扫描",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
        {
          name: "单元测试",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
      ],
    },
    {
      name: "部署阶段",
      steps: [
        {
          name: "环境部署",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
        {
          name: "代码包上传",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
        {
          name: "线上准入检查",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
      ],
    },
    {
      name: "发布完成通知",
      steps: [
        {
          name: "企业微信推送",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
        {
          name: "邮件推送",
          stepType: StepTypeEnum.pullCode,
          content: "",
        },
      ],
    },
  ]);
  const [subOperationElement, setOperationElement] = useState<any>(null);

  /**
   * 页面初始化事件
   */
  useEffect(() => {}, [stageList]);
  const onAddStageModal = () => {
    setStageOperationElement(
      <StageOperation
        onCallbackEvent={clearElement}
        onAddStage={onAddStage}
        operationType={OperationTypeEnum.add}
      />
    );
  };

  const clearElement = () => {
    setStageOperationElement(null);
  };

  /**
   * 添加阶段
   */
  const onAddStage = (_name: string) => {
    setStageList((current) => [
      ...current,
      {
        name: _name,
        steps: [],
      },
    ]);
    clearElement();
  };

  /**
   * 修改阶段
   */
  const onEditStage = (_stageIndex: number, _name: string) => {
    stageList.filter((item, index) => {
      if (index === _stageIndex) {
        item.name = _name;
      }
    });
    setStageList((current) => [...current]);
    clearElement();
  };

  /**
   * 删除步骤
   */
  const onEditStageModal = (_stage: IStageDto, _stageIndex: number) => {
    setStageOperationElement(
      <StageOperation
        onCallbackEvent={clearElement}
        onEditStage={onEditStage}
        operationType={OperationTypeEnum.edit}
        stage={_stage}
        stageIndex={_stageIndex}
      />
    );
  };

  /**
   * 添加步骤
   */
  const onAddStep = (_stageIndex: number) => {
    stageList.filter((item, index) => {
      if (index == _stageIndex) {
        item.steps.push({
          name: "asdasdas",
          stepType: StepTypeEnum.pullCode,
          content: "asdasdasdasdasdasdasdasdasdasdas",
        });
      }
    });
    setStageList((current) => [...current]);
  };

  /**
   * 删除阶段
   */
  const onRemoveStage = (_stageIndex: number) => {
    stageList.splice(_stageIndex, 1);
    setStageList((current) => [...current]);
  };

  /**
   * 删除步骤
   */
  const onRemoveStep = (_stageIndex: number, _stepIndex: number) => {
    console.log("onRemove");
    stageList.filter((item, index) => {
      if (index === _stageIndex) {
        item.steps.splice(_stepIndex, 1);
      }
    });
    setStageList((current) => [...current]);
  };
  /**
   * 保存
   */
  const onSave = () => {
    // var param = {
    //   appId: "luck.walnut",
    //   appEnvironmentId: "string",
    //   name: "string",
    //   pipelineState: 0,
    //   pipelineScript: stageList
    // }
    // _applicationPipelineService.create(param).then(rep=>{
    //   console.log(rep);
    // })
    console.log(1)
    setStageOperationElement(
      <SaveOperation id="" 
      operationType={OperationTypeEnum.add} 
      stageList={stageList}
      onCallbackEvent={clearElement}
      />
    )

  };
  // const clearElement = () => {
  //   setOperationElement(null);
  //   getPageList();
  // };

  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          <Col span="24" style={{ textAlign: "right", minWidth: 270 }}>
            <Button
              shape="round"
              type="primary"
              style={{ margin: "8px 8px" }}
              onClick={() => {
                onSave();
              }}
            >
              <PlusOutlined />
              保存流水线
            </Button>
          </Col>
        </Row>
        <Row gutter={16} wrap={false}>
          {stageList.map((stage: IStageDto, index) => {
            return (
              <Col span={4}>
                <PipelineStage
                  onAddStep={onAddStep}
                  onRemoveStage={onRemoveStage}
                  onRemoveStep={onRemoveStep}
                  stageIndex={index}
                  onEditStage={onEditStageModal}
                  stage={stage}
                />
              </Col>
            );
          })}
          <Col span={4}>
          <Card style={{ marginBottom: 10, textAlign: "center" }}>
          <Button
              shape="round"
              style={{ margin: "8px 8px" }}
              onClick={() => {
                onAddStageModal();
              }}
            >
              <PlusOutlined />
              添加阶段
            </Button>
            </Card>
              </Col>
        </Row>
        {stageOperationElement}
      </Spin>
    </div>
  );
};

export default Operation;
