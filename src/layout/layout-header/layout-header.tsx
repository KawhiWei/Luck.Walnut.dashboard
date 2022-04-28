import "./layout-header.less";

import { Button, Layout } from 'antd';

import React from 'react'

const LayoutHeader = () => {
    const logout = () => {
        localStorage.removeItem("token");
    }
    return (
        <div>
            <Layout.Header className="sukt-layout__header">
                <Button ghost={true} type="primary" onClick={logout}>退出登录</Button>
            </Layout.Header>
        </div>
    )
};
export default LayoutHeader;