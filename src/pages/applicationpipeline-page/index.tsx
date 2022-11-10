import { Button, Card, Col, Form, PaginationProps, Row, Spin, Tag } from "antd";
import {
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { IocTypes } from "@/shared/config/ioc-types";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
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
  const [formData] = Form.useForm();
  const [tableData, setTableData] = useState<Array<any>>([]);
  const pagination: PaginationProps = {
    ...tacitPagingProps,
    total: paginationConfig.total,
    current: paginationConfig.current,
    pageSize: paginationConfig.pageSize,
    showTotal: (total) => {
      return `共 ${total} 条`;
    },
    onShowSizeChange: (current: number, pageSize: number) => {
      setPaginationConfig((Pagination) => {
        Pagination.pageSize = pageSize;
        Pagination.current = current;
        return Pagination;
      });
      getPageList();
    },
    onChange: (page: number, pageSize?: number) => {
      setPaginationConfig((Pagination) => {
        Pagination.current = page;
        if (pageSize) {
          Pagination.pageSize = pageSize;
        }
        return Pagination;
      });
      getPageList();
    },
  };
  const columns = [
    {
      title: "应用英文名",
      dataIndex: "englishName",
      key: "englishName",
    },
    {
      title: "应用中文名",
      dataIndex: "chinessName",
      key: "chinessName",
    },
    {
      title: "应用标识",
      dataIndex: "appId",
      key: "appId",
    },
    {
      title: "所属项目",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "所属部门",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "应用状态",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (text: any, record: any) => {
        return <div></div>;
      },
    },
    {
      title: "联系人",
      dataIndex: "linkMan",
      key: "linkMan",
    },
  ];

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getPageList();
  }, [paginationConfig]);

  /**
   * 页面初始化获取数据
   */
  const getPageList = () => {
    setLoading(true);
    let param = formData.getFieldsValue();
    let _param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
      projectId: param.projectId,
      appId: param.appId,
      englishName: param.englishName,
      chinessName: param.chinessName,
      principal: param.principal,
      applicationState: param.applicationState,
    };
    _applicationPipelineService
      .getPage("luck.walnut", _param)
      .then((rep) => {
        if (rep.success) {
          setPaginationConfig((Pagination) => {
            Pagination.total = rep.result.total;
            return Pagination;
          });

          console.log(rep.result);
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

  const onSearch = () => {
    setPaginationConfig((Pagination) => {
      Pagination.current = 1;
      return Pagination;
    });
    getPageList();
  };

  return (
    <div>
      <Spin spinning={loading}>
        {/* <Form
          form={formData}
          name="horizontal_login"
          layout="horizontal"
          {...searchFormItemDoubleRankLayout}
          onFinish={onSearch}
        >
          <Row>
            <Col span="6" style={{ textAlign: "center" }}>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                onClick={() => {
                  getPageList();
                }}
              >
                <SearchOutlined />
                查询
              </Button>
            </Col>
          </Row>
        </Form> */}
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
                    <EditOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EditOutlined key="ellipsis" />,
                  ]}
                >
                  <div>{item.appEnvironmentId}</div>
                  <Tag icon={<SyncOutlined spin />} color="processing">
                    构建中
                  </Tag>
                  <div></div>
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
