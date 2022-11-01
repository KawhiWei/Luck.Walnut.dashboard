import {
  Button,
  Col,
  PaginationProps,
  Popconfirm,
  Row,
  Spin,
  Table,
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

import { IComponentIntegrationService } from "@/domain/componentintegration/icomponentintegration-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ComponentIntegrationPage = () => {
  const _componentIntegrationService: IComponentIntegrationService =
    useHookProvider(IocTypes.ComponentIntegrationService);

  const [loading, setloading] = useState<boolean>(false);
  /**
   * 配置添加/修改组件
   */
  const [OperationElement, setOperationElement] = useState<any>(null);
  /**
   * 配置添加/修改组件
   */
  const [componentLinkTypeArray, setComponentLinkTypeArray] = useState<any>(
    new Array<any>()
  );

  const addChange = () => {
    setOperationElement(
      <Operation
        onCallbackEvent={clearElement}
        componentLinkTypeArray={componentLinkTypeArray}
        operationType={OperationTypeEnum.add}
      />
    );
  };

  const clearElement = () => {
    setOperationElement(null);
    getPageList();
  };

  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
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

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getEnumList();
    getPageList();
  }, [paginationConfig]);

  /**
   * 页面初始化获取数据
   */
  const getPageList = () => {
    setloading(true);
    let _param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
    };

    _componentIntegrationService.getPage(_param).then((rep) => {
      if (rep.success) {
        setPaginationConfig((Pagination) => {
          Pagination.total = rep.result.total;
          return Pagination;
        });
        setTableData(rep.result.data);
        setloading(false);
      }
    });
  };

  const getEnumList = () => {
    _componentIntegrationService
      .getEnumList()
      .then((rep) => {
        if (rep.success) {
          setComponentLinkTypeArray(rep.result.componentLinkTypeEnumList);
        }
      })
      .catch((c) => {});
  };
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "集成组件类型",
      dataIndex: "componentLinkTypeName",
      key: "componentLinkTypeName",
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => {
        return (
          <div className="table-operation">
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
    },
  ];

  /**
   * 修改组件配置
   * @param _id
   */
  const editRow = (_id: any) => {
    setOperationElement(
      <Operation
        onCallbackEvent={clearElement}
        componentLinkTypeArray={componentLinkTypeArray}
        operationType={OperationTypeEnum.edit}
        id={_id}
      />
    );
  };

  const deleteRow = (_id: string) => {
    _componentIntegrationService.delete(_id).then((res) => {
      if (!res.success) {
        message.error(res.errorMessage, 3);
      } else {
        getPageList();
      }
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
        {OperationElement}
      </Spin>
    </div>
  );
};

export default ComponentIntegrationPage;
