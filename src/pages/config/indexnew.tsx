import { Button, Card, Col, Row, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";

import ConfigTable from "./configtable-page";
import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { RollbackOutlined } from "@ant-design/icons";
import { initPaginationConfig } from "../../shared/ajax/request";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 应用信息
   */
  applicationData?: IApplicationBaseDto;
}

const NewConfigPage = (props: IProp) => {
  const history = useHistory();
  const _environmentService: IEnvironmentService = useHookProvider(
    IocTypes.EnvironmentService
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [environmentList, setEnvironmentList] = useState<Array<any>>([]);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getEnvironmentList();
  }, [props.applicationData]);

  /**
   * 获取环境列表信息
   */
  const getEnvironmentList = () => {
    setLoading(true);
    props.applicationData &&
      _environmentService
        .getEnvironmentList(props.applicationData.appId)
        .then((x) => {
          if (x.success) {
            setEnvironmentList(x.result);
            setLoading(false);
          }
        });
  };

  /**
   * 跳转到应用列表
   * @param _appId
   */
  const backToApplicationList = () => {
    history.push({
      pathname: "/application/list",
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          <Col span="24">
            <Card>
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
      </Spin>
    </div>
  );
};
export default NewConfigPage;
