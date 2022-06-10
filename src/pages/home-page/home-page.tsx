import "./home-page.less"

import { Card, Col, Row } from "antd";
import { CaretDownOutlined, CaretUpOutlined, FormOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

// import Draggable from 'react-draggable'; 
import StackedLineCharts from "./stacked-line-charts";

const HomePage = () => {
  const [stackedLineChart]=useState<any>(<StackedLineCharts/>);


  return (
    <div>
      <div draggable="true" style={{ width: '120px', textAlign: 'center' , height: '32px',backgroundColor:'#358dff',border: '1px dashed #ccc'}} >
      <FormOutlined/><span>输入框</span>
      </div>
    </div>
  )
}
export default HomePage;