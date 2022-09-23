import "antd/dist/antd.less";
import "./global";

import React from 'react';
import ReactDOM from 'react-dom';
import Router from "@/router/index";
import startQiankun from "@/shared/micro";

startQiankun();
ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,

  document.getElementById('sukt')
);
