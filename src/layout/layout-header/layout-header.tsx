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
    const confirm = () => {
        message.info('Clicked on Yes.');
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    const items: MenuProps['items'] = [
        {
            label: '1st menu item',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: '2nd menu item',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: '3rd menu item',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        },
        {
            label: '4rd menu item',
            key: '4',
            icon: <UserOutlined />,
            danger: true,
            disabled: true,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

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

                        <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                            Dropdown
                        </Dropdown.Button>
                    </Space>

                </div>


            </Layout.Header>
        </div>
    )
};
export default LayoutHeader;