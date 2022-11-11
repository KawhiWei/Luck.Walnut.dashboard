import { Button, Card, Col, Form, Row, Spin, Tag, message } from "antd";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  SyncOutlined,
  UpSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  IApplicationPipelineBaseDto,
  IApplicationPipelineOutputDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import { useEffect, useState } from "react";

import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Item from "antd/lib/list/Item";
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

  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<
    Array<IApplicationPipelineOutputDto>
  >([]);
  const [appId, setAppId] = useState<string>();
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

  const goToAddApplicationPileLineOperation = () => {
    props.appId &&
      history.push({
        pathname: "/application/pipeline/edit",
        state: {
          appId: props.appId,
        },
      });
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
                <Card title={item.name}>
                  <Row
                    style={{ marginBottom: 30, textAlign: "center" }}
                    gutter={[16, 8]}
                  >
                    <Col span={12}>
                      <PlayCircleOutlined
                        style={{
                          fontSize: 20,
                        }}
                        onClick={() => onExecuteJob(item.id)}
                      />
                    </Col>
                    <Col span={12}>
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
                  <Row
                    style={{ marginBottom: 30, textAlign: "center" }}
                    gutter={[16, 8]}
                  >
                    <Col span={12}>
                      任务：<a>asad</a>
                    </Col>
                    <Col span={12}>
                      <Tag style={{ textAlign: "center" }} color="processing">
                        {item.pipelineStateName}
                      </Tag>
                    </Col>
                  </Row>
                  <Row gutter={[16, 8]} style={{ marginBottom: 10 }}>
                    <Col span={8} style={{ textAlign: "center" }}>
                      {/* <UpSquareOutlined style={{
                        color: "#2db7f5",
                        fontSize: 16,
                      }}/> */}

                      <CloudUploadOutlined
                        style={{
                          color: "#2db7f5",
                          fontSize: 20,
                        }}
                        onClick={() => onPublish(item.id)}
                      />
                      {/* <SendOutlined style={{
                        color: "#2db7f5",
                        fontSize: 16,
                      }}/> */}
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <EditOutlined
                        style={{
                          color: "orange",
                          fontSize: 20,
                        }}
                      />
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <DeleteOutlined
                        style={{
                          color: "red",
                          fontSize: 20,
                        }}
                        onClick={() => onDelete(item.id)}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Spin>
    </div>
  );
};

export default PipelinePage;
