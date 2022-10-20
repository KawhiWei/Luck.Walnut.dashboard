import {
  Button,
  Card,
  Col,
  Empty,
  PaginationProps,
  Row,
  Spin,
  Table,
  Tabs,
  Tag,
} from "antd";
import {
  PlusOutlined,
  RollbackOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import ConfigOperation from "./operation";
import ConfigRelease from "./configRelease";
import ConfigTable from "./configtable-page";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const NewConfigPage = (props: any) => {
  const history = useHistory();
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const _environmentService: IEnvironmentService = useHookProvider(
    IocTypes.EnvironmentService
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [appId, setAppId] = useState<string>();
  const [environmentList, setEnvironmentList] = useState<Array<any>>([]);
  const [currentEnvironmentId, setCurrentEnvironmentId] = useState<string>("");
  const [tableData, setTableData] = useState<Array<any>>([]);
  const [configOperationElement, setconfigOperationElement] =
    useState<any>(null);
  const [configRelease, setConfigRelease] = useState<any>(null);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getEnvironmentList();
  }, [paginationConfig, currentEnvironmentId]);

  /**
   * 获取环境列表信息
   */
  const getEnvironmentList = () => {
    if (props.location.state.appId) {
      setAppId(props.location.state.appId);
      setLoading(true);
      props.location.state.appId && console.log(props.location.state.appId);
      props.location.state.appId &&
        _environmentService
          .getEnvironmentList(props.location.state.appId)
          .then((x) => {
            if (x.success) {
              setEnvironmentList(x.result);
              setLoading(false);
            }
          });
    }
  };

  /**
   * 清除弹框
   */
  const claerConfigOperation = () => {
    setconfigOperationElement(null);
  };

  /**
   * 添加配置弹框
   */
  const addChangeConfig = () => {
    setconfigOperationElement(
      <ConfigOperation
        onCallbackEvent={claerConfigOperation}
        operationType={OperationTypeEnum.add}
        environmentId={currentEnvironmentId}
      ></ConfigOperation>
    );
  };

  const publishConfig = () => {
    setConfigRelease(
      <ConfigRelease
        onCallbackEvent={claerConfigRelease}
        operationType={OperationTypeEnum.view}
        environmentId={currentEnvironmentId}
      ></ConfigRelease>
    );
  };

  /**
   * 跳转到配置中心
   * @param _appId
   */
  const backToApplicationList = () => {
    history.push({
      pathname: "/application/list",
    });
  };
  const claerConfigRelease = () => {
    setConfigRelease(null);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          <Col span="24">
            <Card
              title="配置管理"
              extra={
                <Button
                  type="primary"
                  shape="round"
                  style={{ margin: "8px 8px " }}
                  onClick={() => {
                    backToApplicationList();
                  }}
                >
                  <RollbackOutlined />
                  返回上一层
                </Button>
              }
            >
              <Tabs
                defaultActiveKey="1"
                items={environmentList.map((x) => {
                  return {
                    label: x.environmentName,
                    key: x.id,
                    children: <ConfigTable environmentId={x.id} />,
                  };
                })}
              ></Tabs>
            </Card>
          </Col>
        </Row>
        {configOperationElement}
        {configRelease}
      </Spin>
    </div>
  );
};
export default NewConfigPage;
