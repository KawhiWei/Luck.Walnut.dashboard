import "../table.less";

import {
  Button,
  Col,
  Form,
  Input,
  PaginationProps,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingTwoTone,
  WarningOutlined,
} from "@ant-design/icons";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { ApplicationStateMap } from "@/domain/maps/application-map";
import ApplicationStateTag from "./applicationStateTag";
import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ApplicationPage = () => {
  const history = useHistory();
  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const _projectService: IProjectService = useHookProvider(
    IocTypes.ProjectService
  );
  const [tableData, setTableData] = useState<Array<IApplicationBaseDto>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [subOperationElement, setOperationElement] = useState<any>(null);
  const [formData] = Form.useForm();
  const [projectArray, setProjectArray] = useState<Array<any>>([]);
  const [componentIntegrationArray, setComponentIntegrationArray] = useState<Array<any>>([]);



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
      render: (text: any, record: any) => {
        return (
          <div className="table-operation">
            <Button type="link"
              onClick={() => goToApplicationDashboard(record.appId)}>{record.englishName}</Button>
          </div>
        );
      },
    },
    {
      title: "应用中文名",
      dataIndex: "chineseName",
      key: "chineseName",
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
      title: "应用状态",
      dataIndex: "id",
      key: "id",
      width: 120,
      // fixed: 'right',
      render: (text: any, record: any) => {
        return (
          <div>
            <ApplicationStateTag
              applicationState={record.applicationState}
              applicationStateName={record.applicationStateName}
            />
          </div>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      width: 400,
      render: (text: any, record: any) => (
        <div className="table-operation">
          {/* <Tooltip placement="top" title="应用看板">
            <EyeOutlined
              style={{ color: "#108ee9", marginRight: 10, fontSize: 16 }}
              onClick={() => goToApplicationDashboard(record.appId)} />
          </Tooltip> */}
          {/* <Tooltip placement="top" title="配置管理">
            <SettingTwoTone
              style={{ marginRight: 10, fontSize: 16 }}
              onClick={() => goToConfig(record.appId)} />
          </Tooltip> */}
          <Tooltip placement="top" title="编辑">
            <EditOutlined
              style={{ color: "orange", marginRight: 10, fontSize: 16 }}
              onClick={() => editRow(record.id)} />
          </Tooltip>
          <Tooltip placement="top" title="删除">
            <Popconfirm
              placement="top"
              title="确认删除?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => deleteRow(record.id)}
              icon={<WarningOutlined />}
            >
              <DeleteOutlined style={{ color: "red", fontSize: 16 }} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const goToApplicationDashboard = (_appId: string) => {
    history.push({
      pathname: "/application/dashboard",
      state: {
        appId: _appId,
      },
    });
  };

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getPageList();
    onGetProjectList();
    onGetApplicationSelectedData();
  }, [paginationConfig]);

  const onSearch = () => {
    setPaginationConfig((Pagination) => {
      Pagination.current = 1;
      return Pagination;
    });
    getPageList();
  };

  const onGetProjectList = () => {
    let param = { pageSize: 1000, pageIndex: 1 };
    _projectService.getPage(param).then((rep) => {
      if (rep.success) {
        setProjectArray(rep.result.data);
      }
    });
  };

  const onGetApplicationSelectedData = () => {
    _applicationService.getApplicationSelectedData().then((rep) => {
      if (rep.success) {
        setComponentIntegrationArray(rep.result.componentIntegrationList);
      }
    });
  };

  /**
   * 修改任务
   * @param _id
   */
  const editRow = (_id: any) => {
    setOperationElement(
      <Operation
        componentIntegrationArray={componentIntegrationArray}
        onCallbackEvent={clearElement}
        operationType={OperationTypeEnum.edit}
        id={_id}
        projectArray={projectArray}
      />
    );
  };

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
      chineseName: param.chineseName,
      principal: param.principal,
      applicationState: param.applicationState,
    };
    _applicationService
      .getPage(_param)
      .then((rep) => {
        if (rep.success) {
          setPaginationConfig((Pagination) => {
            Pagination.total = rep.result.total;
            return Pagination;
          });
          setTableData(rep.result.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearElement = () => {
    setOperationElement(null);
    getPageList();
  };

  const deleteRow = (_id: string) => {
    _applicationService.delete(_id).then((res) => {
      if (!res.success) {
        message.error(res.errorMessage, 3);
      } else {
        getPageList();
      }
    });
  };

  const addChange = () => {
    setOperationElement(
      <Operation
        componentIntegrationArray={componentIntegrationArray}
        onCallbackEvent={clearElement}
        projectArray={projectArray}
        operationType={OperationTypeEnum.add}
      />
    );
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Form
          form={formData}
          name="horizontal_login"
          layout="horizontal"
          {...searchFormItemDoubleRankLayout}
          onFinish={onSearch}
        >
          <Row>
            <Col span="6">
              <Form.Item name="projectId" label="项目：">
                <Select allowClear={true} placeholder="请选择项目">
                  {projectArray.map((item: any) => {
                    return (
                      <Select.Option value={item.id}>{item.name}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span="6">
              <Form.Item name="appId" label="应用标识：">
                <Input
                  style={{ borderRadius: 8 }}
                  placeholder="请请输入应用标识"
                />
              </Form.Item>
            </Col>
            <Col span="6">
              <Form.Item name="englishName" label="应用英文名称：">
                <Input
                  style={{ borderRadius: 8 }}
                  placeholder="请请输入应用英文名称"
                />
              </Form.Item>
            </Col>
            <Col span="6">
              <Form.Item name="chineseName" label="应用中文名称：">
                <Input
                  style={{ borderRadius: 8 }}
                  placeholder="请请输入应用标识"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <Form.Item name="principal" label="应用负责人：">
                <Select allowClear={true} placeholder="请选择应用负责人">
                  {projectArray.map((item: any) => {
                    return (
                      <Select.Option value={item.id}>{item.name}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span="6">
              <Form.Item name="applicationState" label="应用状态：">
                <Select
                  style={{ width: 180 }}
                  allowClear={true}
                  placeholder="请选择应用状态"
                >
                  {ApplicationStateMap.map((item: any) => {
                    return (
                      <Select.Option value={item.key}>
                        {item.value}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
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
        </Form>
        <Row>
          <Col span="24" style={{ textAlign: "right" }}>
            <Button
              shape="round"
              type="primary"
              style={{ margin: "8px 8px" }}
              onClick={() => {
                addChange();
              }}
            >
              <PlusOutlined />
              添加
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={pagination}
              scroll={{ y: 700 }}
              size="small"
            />
          </Col>
        </Row>
        {subOperationElement}
      </Spin>
    </div>
  );
};
export default ApplicationPage;
