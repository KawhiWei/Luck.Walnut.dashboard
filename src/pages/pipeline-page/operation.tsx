import {
  Button,
  Card,
  Col,
  Form,
  PaginationProps,
  Row,
  Spin,
  Table,
  Tag,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingTwoTone,
  SyncOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { IocTypes } from "@/shared/config/ioc-types";
import PipelineStage from "./pipeline-stage";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

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
          {stageList.map((item: IStageDto, index) => {
            return (
              <Col span={4}>
                <PipelineStage
                  onAddStep={onAddStep}
                  stageIndex={index}
                  stage={item}
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
