import "./home-page.less";

import { Card, Col, Row, Tabs } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import PipeFlowConfig from "../application-pipeline-page/pipeline-flow-config";
import PipelinePage from "../application-pipeline-page/index";
// import Draggable from 'react-draggable';
import StackedLineCharts from "./stacked-line-charts";

const HomePage = () => {
  const [stackedLineChart] = useState<any>(<StackedLineCharts />);
  const [tabsArray, setTabsArray] = useState<Array<any>>([
    {
      name: `应用信息`,
      id: "1",
      content: "12312",
    },
    {
      name: `部署环境`,
      id: "2",
      content: "34534",
    },
    {
      name: `应用流水线`,
      id: "3",
      content: "56756",
    },
    {
      name: `发布记录`,
      id: "4",
      content: "145313",
    },
  ]);

  return (
    <div>
      {/* <PipelinePage /> */}
      {/* <Operation /> */}
    </div>
  );
};
export default HomePage;
