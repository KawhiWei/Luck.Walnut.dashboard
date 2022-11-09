import { Button, Card, Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";

import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import PipelineStage from "./pipeline-stage";
import { PlusOutlined } from "@ant-design/icons";

const { Meta } = Card;
/***
 * 应用流水线设计
 */
const Operation = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stageList, setStageList] = useState<Array<IStageDto>>([
    {
      name: "拉取代码",
      steps: [
        {
          name: "拉取代码",
          stepType: "PullCode",
          content: "",
        },
        {
          name: "覆盖率检查",
          stepType: "PullCode",
          content: "",
        },
        {
          name: "镜像构建",
          stepType: "PullCode",
          content: "",
        },
      ],
    },
    {
      name: "测试阶段",
      steps: [
        {
          name: "漏洞扫描",
          stepType: "PullCode",
          content: "",
        },
        {
          name: "单元测试",
          stepType: "PullCode",
          content: "",
        },
      ],
    },
    {
      name: "部署阶段",
      steps: [
        {
          name: "环境部署",
          stepType: "PullCode",
          content: "",
        },
        {
          name: "代码包上传",
          stepType: "PullCode",
          content: "",
        },
        {
          name: "线上准入检查",
          stepType: "PullCode",
          content: "",
        },
      ],
    },
    {
      name: "发布完成通知",
      steps: [
        {
          name: "企业微信推送",
          stepType: "PullCode",
          content: "",
        },
        {
          name: "邮件推送",
          stepType: "PullCode",
          content: "",
        },
      ],
    },
  ]);

  /**
   * 页面初始化事件
   */
  useEffect(() => {}, [stageList]);

  /**
   * 添加阶段
   */
  const onAddStage = () => {
    var _addParam = {
      name: "asdasdas",
      steps: [],
    };
    setStageList((current) => [...current, _addParam]);
  };

  /**
   * 添加阶段
   */
  const onAddStep = (_stageIndex: number) => {
    stageList.filter((item, index) => {
      if (index == _stageIndex) {
        item.steps.push({
          name: "asdasdas",
          stepType: "ada",
          content: "asdasdasdasdasdasdasdasdasdasdas",
        });
      }
    });
    setStageList((current) => [...current]);
  };
  /**
   * 添加阶段
   */
  const onRemoveStage = (_stageIndex: number) => {
    stageList.splice(_stageIndex, 1);
    setStageList((current) => [...current]);
  };

  /**
   * 添加阶段
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

  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          <Col span="24" style={{ textAlign: "right" }}>
            <Button
              shape="round"
              type="primary"
              style={{ margin: "8px 8px" }}
              onClick={() => {
                onAddStage();
              }}
            >
              <PlusOutlined />
              添加阶段
            </Button>
          </Col>
        </Row>
        <Row gutter={16} style={{ overflow: "auto" }} wrap={false}>
          {stageList.map((stage: IStageDto, index) => {
            return (
              <Col span={4}>
                <PipelineStage
                  onAddStep={onAddStep}
                  onRemoveStage={onRemoveStage}
                  onRemoveStep={onRemoveStep}
                  stageIndex={index}
                  stage={stage}
                />
              </Col>
            );
          })}
        </Row>
      </Spin>
    </div>
  );
};

export default Operation;
