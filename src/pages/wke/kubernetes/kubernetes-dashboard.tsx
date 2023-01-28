import {
  Card,
  Col,
  Divider,
  List,
  Progress,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { useEffect, useState } from "react";

import { AntDesignChartsRadarDto } from "@/domain/kubernetes/clusters/kubernetes-cluster-dto";
import { IClusterService } from "@/domain/kubernetes/clusters/icluster-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { Radar } from "@ant-design/charts";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const KubernetesDashboard = (props: any) => {
  const _clusterService: IClusterService = useHookProvider(
    IocTypes.ClusterService
  );

  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<Array<any>>([]);
  const [selectValue, setSelectValue] = useState<string>("");
  const [radarData, setRadarData] = useState<Array<AntDesignChartsRadarDto>>(
    []
  );

  const config = {
    data: radarData.map((d) => ({ ...d, star: Math.sqrt(d.count) })),
    xField: "name",
    yField: "count",
    appendPadding: [0, 10, 0, 10],
    meta: {
      star: {
        alias: "name-数量",
        min: 0,
        nice: true,
        formatter: (v: any) => Number(v).toFixed(2),
      },
    },
    xAxis: {
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: "rgba(0, 0, 0, 0.04)",
      },
    },
    // 开启辅助点
    point: {
      size: 2,
    },
    area: {},
  };

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetClusterList();
  }, []);

  /**
   *获取集群列表
   */
  const onGetClusterList = () => {
    _clusterService
      .getClusterList()
      .then((rep) => {
        setSelectData(rep.result);
      })
      .finally(() => {
        setGlobalLoading(false);
      });
  };

  /**
   *
   * @param value
   */
  const selectHandleChange = (value: string) => {
    setSelectValue(value);
    onGetClusterDashboard(value);
  };

  /**
   * 获取K8s集群可视化面板信息
   * @param _id
   */
  const onGetClusterDashboard = (_id: string) => {
    _clusterService
      .getClusterDashboard(_id)
      .then((rep) => {
        const data: AntDesignChartsRadarDto[] = [
          {
            name: "namespace",
            count: rep.result.namespaceTotal,
          },
          {
            name: "replicaSet",
            count: rep.result.replicaSetTotal,
          },
          {
            name: "statefulSet",
            count: rep.result.statefulSetTotal,
          },
          {
            name: "jobTotal",
            count: rep.result.jobTotal,
          },
          {
            name: "daemonSet",
            count: rep.result.daemonSetTotal,
          },
          {
            name: "deployment",
            count: rep.result.deploymentTotal,
          },
          {
            name: "node",
            count: rep.result.nodes.length,
          },
        ];
        setRadarData(data);
      })
      .finally(() => {});
  };

  return (
    <div>
      <Spin spinning={globalLoading}>
        <Row gutter={[16, 16]}>
          <Col span="12">
            <Card title="概览">
              <Row gutter={[16, 16]}>
                <Col span="12">
                  集群列表：
                  <Select
                    allowClear={true}
                    value={selectValue}
                    style={{ width: 180 }}
                    onChange={selectHandleChange}
                  >
                    {selectData.map((item) => {
                      return (
                        <Select.Option value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col span="12">
                  <Card title="统计信息"></Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span="6">
            <Card title="概览">
              <Radar {...config} />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default KubernetesDashboard;
