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

import ApplicationStateTag from "./applicationStateTag";
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
  const [tableData, setTableData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [subOperationElement, setOperationElement] = useState<any>(null);
  const [formData] = Form.useForm();
  const [projectArray, setProjectArray] = useState<Array<any>>([]);
  const [applicationStateArray, setApplicationStateArray] = useState<
    Array<any>
  >([]);
  const [applicationLevelArray, setApplicationLevelArray] = useState<
    Array<any>
  >([]);

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
      title: "联系人",
      dataIndex: "linkMan",
      key: "linkMan",
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      _render: (text: any, record: any) => {
        return (
          <div className="table-operation">
            <Tooltip placement="top" title="应用看板">
              <EyeOutlined
                style={{ color: "#108ee9", marginRight: 10, fontSize: 16 }}
                onClick={() => goToApplicationDashboard(record.appId)}
              />
            </Tooltip>
            <Tooltip placement="top" title="配置管理">
              <SettingTwoTone
                style={{ marginRight: 10, fontSize: 16 }}
                onClick={() => goToConfig(record.appId)}
              />
            </Tooltip>
            <Tooltip placement="top" title="编辑">
              <EditOutlined
                style={{ color: "orange", marginRight: 10, fontSize: 16 }}
                onClick={() => editRow(record.id)}
              />
            </Tooltip>
            <Tooltip placement="top" title="删除">
              <Popconfirm
                placement="top"
                title="确认删除?"
                onConfirm={() => deleteRow(record.id)}
                icon={<WarningOutlined />}
              >
                <DeleteOutlined style={{ color: "red", fontSize: 16 }} />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
      get render() {
        return this._render;
      },
      set render(value) {
        this._render = value;
      },
    },
  ];

  /**
   * 跳转到配置中心
   * @param _appId
   */
  const goToConfig = (_appId: string) => {
    history.push({
      pathname: "/application/configcenterold",
      state: {
        appId: _appId,
      },
    });
  };
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
    onApplicationEnumList();
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
    _projectService.getPageList(param).then((rep) => {
      if (rep.success) {
        setProjectArray(rep.result.data);
      }
    });
  };

  const onApplicationEnumList = () => {
    _applicationService.getApplicationEnumList().then((rep) => {
      if (rep.success) {
        setApplicationStateArray(rep.result.applicationStateEnumList);
        setApplicationLevelArray(rep.result.applicationLevelEnumList);
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
        onCallbackEvent={clearElement}
        operationType={OperationTypeEnum.edit}
        id={_id}
        applicationLevelArray={applicationLevelArray}
        applicationStateArray={applicationStateArray}
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
      chinessName: param.chinessName,
      principal: param.principal,
      applicationState: param.applicationState,
    };
    _applicationService
      .getPage(_param)
      .then((x) => {
        if (x.success) {
          setPaginationConfig((Pagination) => {
            Pagination.total = x.result.total;
            return Pagination;
          });
          setTableData(x.result.data);
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
        onCallbackEvent={clearElement}
        projectArray={projectArray}
        applicationStateArray={applicationStateArray}
        applicationLevelArray={applicationLevelArray}
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
              <Form.Item name="chinessName" label="应用中文名称：">
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
                  {applicationStateArray.map((item: any) => {
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
            />
          </Col>
        </Row>
        {subOperationElement}
      </Spin>
    </div>
  );
};
export default ApplicationPage;
