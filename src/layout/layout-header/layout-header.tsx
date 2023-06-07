import "./layout-header.less";

import { Avatar, Button, Dropdown, Layout, MenuProps, Popconfirm, Space, message } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import React, { useState } from "react";

const LayoutHeader = () => {
    const text = 'Are you sure to delete this task?';
    const description = 'Delete the task';
    const [collapsed, setCollapsed] = useState(false);
    const logout = () => {
        localStorage.removeItem("token");
    }
    return (
        <div>
            <Layout.Header className="luck-layout-header">
                {/* <Button ghost={true} type="primary" onClick={logout}>退出登录</Button> */}
                <div>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        style: { color: "white" },
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <Space wrap size={30}>
                    </Space>

                </div>


            </Layout.Header>
        </div>
    )
};
export default LayoutHeader;