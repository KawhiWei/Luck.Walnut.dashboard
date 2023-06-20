import "../table.less";
import "./index.less";

import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  MenuProps,
  PaginationProps,
  Row,
  Space,
  Spin,
  Tooltip,
  message
} from "antd";
import {
  BranchesOutlined,
  CameraOutlined,
  EditOutlined,
  PartitionOutlined,
  PlusOutlined,
  SyncOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { IApplicationOutputDto } from "@/domain/applications/application-dto";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
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
  const [tableData, setTableData] = useState<Array<IApplicationOutputDto>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [subOperationElement, setOperationElement] = useState<any>(null);
  const [formData] = Form.useForm();
  const [projectArray, setProjectArray] = useState<Array<any>>([]);
  const [componentIntegrationArray, setComponentIntegrationArray] = useState<Array<any>>([]);



  const handleMenuClick: MenuProps['onClick'] = e => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };



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

  /**
   * 
   * @param name 
   * @returns 
   */
  const getAvatarColor = (name: any) => {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const charIndex = Math.abs(name.charCodeAt(0) - 65) % 4;
    return colors[charIndex];
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
  }, [paginationConfig]);

  const onSearch = () => {
    setPaginationConfig((Pagination) => {
      Pagination.current = 1;
      return Pagination;
    });
    getPageList();
  };

  /**
   * 修改任务
   * @param _id
   */
  const editRow = (_id: any) => {
    setLoading(true);
    _applicationService.getDetail(_id).then(rep => {
      if (rep.success) {
        setOperationElement(
          <Operation
            onCallbackEvent={clearElement}
            operationType={OperationTypeEnum.edit}
            id={_id}
            formData={rep.result}
          />
        );
      }
      else {
        message.error(rep.errorMessage, 3);
      }
    })
      .finally(() => {
        setLoading(false);
      });


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
        onCallbackEvent={clearElement}
        operationType={OperationTypeEnum.add}
      />
    );
  };

  return (
    <div >
      <Spin spinning={loading}>
        <Row style={{ marginBottom: "10px", backgroundColor: "white", height: "56px", padding: "0px 28px", }}>
          <Row>
            <Space align="center" >
              <SyncOutlined
                style={{ textAlign: "right", marginRight: 10, fontSize: 16 }}
                onClick={() => {
                  getPageList();
                }}
              />
              <Button
                style={{ float: "right" }}
                size="middle"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => addChange()}
              >
                创建应用
              </Button>
            </Space>
          </Row>
        </Row>
        <Row gutter={[12, 12]} style={{ padding: "0px 8px", }} >
          {tableData.map((item: IApplicationOutputDto) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                <div className="app-card" style={{ borderRadius: 8 }} >
                  <div className="app-card-title" onClick={() => {
                    console.log(31231231232121)
                  }}                >
                    <Avatar size={35} shape="square" style={{ marginRight: 15, backgroundColor: getAvatarColor(item.appId), fontWeight: 700 }}>{item.appId[0].toUpperCase()}</Avatar>
                    <div >{item.appId}</div>
                  </div>
                  <div className="card-operation-label-body">
                    <div className="card-operation-label-filed">
                      <div >最新镜像：<span>Release20230620</span></div>
                    </div>
                  </div>
                  <div className="card-operation" >
                    <div className="card-operation-text" >
                      其他操作
                    </div>
                    <div className="card-operation-body">
                      <div className="card-operation-body-icon">
                        <Tooltip title="构建过程">
                          <PartitionOutlined onClick={() => { console.log("asdasdasdasdassad") }} />
                        </Tooltip>
                      </div>
                      <div className="card-operation-body-icon">
                        <Tooltip title="构建快照">
                          <CameraOutlined onClick={() => { }} />
                        </Tooltip>
                      </div>
                      <div className="card-operation-body-icon">
                        <Tooltip title="改动记录">
                          <BranchesOutlined onClick={() => { }} />
                        </Tooltip>
                      </div>
                      <div className="card-operation-body-icon">
                        <Tooltip title="编辑">
                          <EditOutlined onClick={() => editRow(item.id)} />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>)
          })}
        </Row>
        {subOperationElement}
      </Spin>
    </div>
  );
};
export default ApplicationPage;
