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
    name: "应用中心",
    path: "/application",
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
        id: "1001-3",
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
        id: "1001-4",
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
      },
    ],
  },
  {
    id: "1002",
    name: "系统日志",
    path: "/system/log",
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
    path: "/project/manager",
    component: "pages/test-page/test-page",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "<DesktopOutlined/>",
    parentNumber: "",
    microName: "",
    componentName: "project-page",
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
        componentName: "menu-page",
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
        parentId: "1003",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "project-page",
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
      },
      {
        id: "1004-2",
        name: "镜像管理",
        path: "/buildimage/manage",
        component: "pages/buildimage-page/index",
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
      },
      {
        id: "1004-3",
        name: "SideCar",
        path: "/initcontainer/InitContainerConfigurationPage",
        component: "pages/initcontainer-page/index",
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
      }
    ],
  },
  {
    id: "1005",
    name: "WKE",
    path: "/wke/dashboard",
    component: "pages/wke/kubernetes/kubernetes-dashboard",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "<DesktopOutlined/>",
    parentNumber: "",
    microName: "",
    componentName: "wke-dashboard-page",
    sort: 0,
    isShow: true,
    type: 0,
    children: [
      {
        id: "1005-1",
        name: "Cluster OverView",
        path: "/wke/kubernetes/dashboard",
        component: "pages/wke/kubernetes/kubernetes-dashboard",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "wke-cluster-dashboard",
        sort: 0,
        isShow: true,
        type: 0,
        children: [],
      },
      {
        id: "1005-2",
        name: "集群管理",
        path: "/wke/kubernetes/cluster",
        component: "pages/wke/kubernetes/cluster-page/index",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "wke-cluster",
        sort: 0,
        isShow: true,
        type: 0,
        children: [],
      },
      {
        id: "1005-3",
        name: "NameSpace",
        path: "/wke/kubernetes/namespace",
        component: "pages/wke/kubernetes/namespace-page/index",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "wke-namespace",
        sort: 0,
        isShow: true,
        type: 0,
        children: [],
      }],
  },
  {
    id: "1006",
    name: "模板管理",
    path: "/template",
    component: "pages/templates/pipeline-template-page",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "<DesktopOutlined/>",
    parentNumber: "",
    microName: "",
    componentName: "wke-dashboard-page",
    sort: 0,
    isShow: true,
    type: 0,
    children: [
      {
        id: "1006-1",
        name: "CI流水线模板",
        path: "/pipeline/templates",
        component: "pages/templates/pipeline-template-page/index",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "jenkins-config-page",
        sort: 0,
        isShow: true,
        type: 0,
        children: [],
      },
      {
        id: "1006-2",
        name: "JenkinsConfig",
        path: "/ci/pipeline/templates/edit",
        component: "pages/templates/pipeline-template-page/operation",
        tabs: [],
        buttonClick: "",
        buttons: [],
        parentId: "000",
        icon: "",
        parentNumber: "",
        microName: "",
        componentName: "templates-jenkins-config-page",
        sort: 0,
        isShow: false,
        type: 0,
        children: [],
      }
    ],
  },
]
