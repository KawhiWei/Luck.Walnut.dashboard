import { Button, Card, Col, Form, Row, Spin, Tag, message } from "antd";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  SnippetsOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  IApplicationPipelineBaseDto,
  IApplicationPipelineOutputDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import {
  formItemSingleRankLayout,
  pipelineFormItemSingleRankLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import BuildLogs from "./build-log";
import ExecutedHistory from "./executed-history";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Item from "antd/lib/list/Item";
import OperationNew from "./operation-new";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { PipelineBuildStateEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import { id } from "inversify";
import { initPaginationConfig } from "../../shared/ajax/request";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 应用Id
   */
  appId?: string;
}

/***
 * 应用流水线设计
 */
const PipelinePage = (props: IProp) => {
  const history = useHistory();
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);

  const [subOperationElement, setOperationElement] = useState<any>(null);

  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<
    Array<IApplicationPipelineOutputDto>
  >([]);
  const [appId, setAppId] = useState<string>();

  const [subBuildLogsElement, setBuildLogsElement] = useState<any>(null);

  const [subExecutedHistoryElement, setExecutedHistoryElement] =
    useState<any>(null);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    if (props.appId) {
      props.appId && setAppId(props.appId);
      getPageList();
    }
  }, [appId]);

  /**
   * 执行一次任务
   */
  const onExecuteJob = (_id: string) => {
    _applicationPipelineService
      .executeJob(_id)
      .then((rep) => {
        if (rep.success) {
          message.success("任务下发成功", 3);
        } else {
          message.success(rep.errorMessage, 3);
        }
      })
      .finally(() => {
        getPageList();
      });
  };

  /**
   * 执行一次任务
   */
  const onDelete = (_id: string) => {
    _applicationPipelineService
      .delete(_id)
      .then((rep) => {
        if (rep.success) {
          message.success("删除成功", 3);
        } else {
          message.success(rep.errorMessage, 3);
        }
      })
      .finally(() => {
        getPageList();
      });
  };

  /**
   * 执行一次任务
   */
  const onPublish = (_id: string) => {
    _applicationPipelineService
      .publish(_id)
      .then((rep) => {
        if (rep.success) {
          message.success("发布成功", 3);
        } else {
          message.success(rep.errorMessage, 3);
        }
      })
      .finally(() => {
        getPageList();
      });
  };

  /**
   * 页面初始化获取数据
   */
  const getPageList = () => {
    setLoading(true);
    let _param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
    };
    props.appId &&
      _applicationPipelineService
        .getPage(props.appId, _param)
        .then((rep) => {
          if (rep.success) {
            setTableData(rep.result.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  /**
   * 页面初始化获取数据
   */
  const onShowLog = (_id: string, _buildId: number) => {
    setBuildLogsElement(
      <BuildLogs
        id={_id}
        buildId={_buildId}
        onCallbackEvent={onShowLogClear}
      ></BuildLogs>
    );
  };

  /**
   * 页面初始化获取数据
   */
  const onShowLogClear = () => {
    setBuildLogsElement(null);
  };

  /**
   * 页面初始化获取数据
   */
  const onShowExecutedHistory = (_id: string) => {
    setBuildLogsElement(null);
    setExecutedHistoryElement(
      <ExecutedHistory
        id={_id}
        onCallbackEvent={onExecutedHistoryClear}
      ></ExecutedHistory>
    );
  };

  /**
   * 页面初始化获取数据
   */
  const onExecutedHistoryClear = () => {
    setExecutedHistoryElement(null);
  };

  const goToAddApplicationPileLineOperation = () => {
    if (props.appId) {
      setOperationElement(
        <OperationNew
          appId={props.appId}
          operationType={OperationTypeEnum.add}
        ></OperationNew>
      );
    }

    // props.appId &&
    //   history.push({
    //     pathname: "/application/pipeline/edit",
    //     state: {
    //       appId: props.appId,
    //     },
    //   });
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
                goToAddApplicationPileLineOperation();
              }}
            >
              <PlusOutlined />
              添加流水线
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {tableData.map((item) => {
            return (
              <Col span={4}>
                <Card
                  title={item.name}
                  actions={[
                    <PlayCircleOutlined
                      style={{
                        fontSize: 20,
                      }}
                      onClick={() => onExecuteJob(item.id)}
                    />,
                    <CloudUploadOutlined
                      key="setting"
                      style={{
                        color: "#2db7f5",
                        fontSize: 20,
                      }}
                      onClick={() => onPublish(item.id)}
                    />,
                    <EditOutlined
                      style={{
                        color: "orange",
                        fontSize: 20,
                      }}
                    />,
                    <HistoryOutlined
                      onClick={() => onShowExecutedHistory(item.id)}
                    />,
                    <DeleteOutlined
                      style={{
                        color: "red",
                        fontSize: 20,
                      }}
                      onClick={() => onDelete(item.id)}
                    />,
                  ]}
                >
                  <Row style={{ marginBottom: 10 }}>
                    <Col span="24">
                      最近任务：
                      {item.pipelineBuildState ==
                      PipelineBuildStateEnum.running ? (
                        <Tag
                          style={{ textAlign: "center" }}
                          color="processing"
                          onClick={() => {
                            onShowLog(item.id, item.jenkinsBuildNumber);
                          }}
                          icon={<SyncOutlined spin />}
                        >
                          {item.jenkinsBuildNumber}
                        </Tag>
                      ) : (
                        <Tag style={{ textAlign: "center" }} color="processing">
                          {item.pipelineBuildStateName}
                        </Tag>
                      )}
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 10 }}>
                    <Col span="24">
                      是否发布：
                      {item.published ? (
                        <Tag style={{ textAlign: "center" }} color="processing">
                          已发布
                        </Tag>
                      ) : (
                        <Tag style={{ textAlign: "center" }} color="gold">
                          未发布
                        </Tag>
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
        {subBuildLogsElement}
        {subExecutedHistoryElement}
        {subOperationElement}
      </Spin>
    </div>
  );
};

export default PipelinePage;
