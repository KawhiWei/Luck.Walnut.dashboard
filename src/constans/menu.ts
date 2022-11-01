import { IMenuOutput } from "@/shared/menu/IMenu";

export const menuList: IMenuOutput[] = [
  {
    id: "1000",
    name: "首页",
    path: "/home",
    component: "pages/home/home",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "",
    parentNumber: "",
    microName: "",
    componentName: "home",
    sort: 0,
    isShow: true,
    type: 0,
    children: [],
  },
  {
    id: "1001",
    name: "应用管理",
    path: "/systemsetting",
    component: "pages/application-page/index",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "<DesktopOutlined/>",
    parentNumber: "",
    microName: "",
    componentName: "test-page",
    sort: 0,
    isShow: true,
    type: 0,
    children: [
      {
        id: "1001-1",
        name: "应用列表",
        path: "/application/list",
        component: "pages/application-page/index",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "application-page",
        sort: 0,
        isShow: true,
        type: 0,
        children: [],
      },
      {
        id: "1001-2",
        name: "应用仪表盘",
        path: "/application/dashboard",
        component: "pages/application-page/application-dashboard",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "menu-page",
        sort: 0,
        isShow: false,
        type: 0,
        children: [],
      },
      {
        id: "1001-2",
        name: "配置中心",
        path: "/application/configcenter",
        component: "pages/config/indexnew",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "menu-page",
        sort: 0,
        isShow: false,
        type: 0,
        children: [],
      },
      {
        id: "1001-3",
        name: "配置中心第一版",
        path: "/application/configcenterold",
        component: "pages/config/index",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "menu-page",
        sort: 0,
        isShow: false,
        type: 0,
        children: [],
      }
    ],
  },
  {
    id: "1002",
    name: "系统日志",
    path: "/systemlog",
    component: "pages/test-page/test-page",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "<DesktopOutlined/>",
    parentNumber: "",
    microName: "",
    componentName: "test-page",
    sort: 0,
    isShow: true,
    type: 0,
    children: [
      {
        id: "1002-1",
        name: "日志查询",
        path: "/log",
        component: "pages/dove-log/index",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "dove-log",
        sort: 0,
        isShow: true,
        type: 0,
        children: [],
      }],
  },
  {
    id: "1003",
    name: "项目管理",
    path: "/projectmanager",
    component: "pages/test-page/test-page",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "<DesktopOutlined/>",
    parentNumber: "",
    microName: "",
    componentName: "test-page",
    sort: 0,
    isShow: true,
    type: 0,
    children: [
      {
        id: "1003-1",
        name: "项目仪表盘",
        path: "/project/dashboard",
        component: "pages/project-dashboard/index",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "matter",
        sort: 0,
        isShow: true,
        type: 0,
        children: [],
      },
      {
        id: "1003-2",
        name: "项目列表",
        path: "/project/list",
        component: "pages/project-page/index",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "matter",
        sort: 0,
        isShow: true,
        type: 0,
        children: [],
      }
    ],
  },
  {
    id: "1004",
    name: "组件集成",
    path: "/componentintegration",
    component: "pages/componentintegration-page/index",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "<DesktopOutlined/>",
    parentNumber: "",
    microName: "",
    componentName: "test-page",
    sort: 0,
    isShow: true,
    type: 0,
    children: [
      {
        id: "1004-1",
        name: "组件配置",
        path: "/componentintegration/config",
        component: "pages/componentintegration-page/index",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "dove-log",
        sort: 0,
        isShow: true,
        type: 0,
        children: [],
      }],
  },
]