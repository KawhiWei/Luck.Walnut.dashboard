import { useEffect, useState } from "react";
import {
    Col,
    Form,
    Row,
    Spin
} from "antd";

import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";

const DeploymentConfigurationPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData] = Form.useForm();

    const onSearch = () => {

    }
    return (
        <div>
            <Spin spinning={loading}>
                <Form form={formData}
                    name="query"
                    layout="horizontal"
                    {...searchFormItemDoubleRankLayout}
                    onFinish={onSearch}
                >
                    <Row>
                        <Col span={6}>
                            <Form.Item name={""}>
                                
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </div>
    )
}

export default DeploymentConfigurationPage;