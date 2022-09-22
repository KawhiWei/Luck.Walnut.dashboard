import { BaseEditor, Descendant, createEditor } from 'slate'
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Space, Upload, message } from "antd";
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { formItemDoubleRankLayout, formItemSingleRankLayout, tailLayout } from "@/constans/layout/optionlayout";
import { useEffect, useMemo, useRef, useState } from "react";

import { Editor } from '@tinymce/tinymce-react';
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import React from 'react';
import TextArea from "antd/lib/input/TextArea";
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadOutlined } from '@ant-design/icons';
import moment from "moment";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const { RangePicker } = DatePicker;

interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
    /**
     * Id
     */
    id?: string;
    /**
     * 操作类型
     */
    operationType: OperationTypeEnum,

    /**
     * 项目状态列表
     */
    projectStatusEnumArray: Array<any>;
}

const validateMessages = {
    required: "${label} 不可为空",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};

const ProjectOperation = (props: IProp) => {

    const initialValue: Descendant[] = [{
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },]
    const [editor] = useState(() => withReact(createEditor()));
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current);
        }
    };

    const _projectService: IProjectService = useHookProvider(IocTypes.ProjectService);
    const [loading, setLoading] = useState<boolean>(false);

    const [defaultFileList, setDefaultFileList] = useState<Array<any>>();

    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [formData] = Form.useForm();

    const projectStatusEnumArray = props.projectStatusEnumArray;
    /**
         * 页面初始化事件
         */
    useEffect(() => {
        onGetLoad()
    }, [formData]);

    /**
     * 修改弹框属性
     * @param _visible 
     * @param _title 
     */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }

    /**
         * 编辑获取一个表单
         * @param _id 
         */
    const onGetLoad = () => {
        switch (props.operationType) {
            case OperationTypeEnum.add:
                editOperationState(true, "添加")
                // formData.setFieldsValue(initformData);
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看")
                break;
            case OperationTypeEnum.edit:
                // props.id && _applicationService.getPageList(props.id).then(rep => {
                //     console.log(rep)
                //     if (rep.success) {
                //         formData.setFieldsValue(rep.result);
                //         editOperationState(true, "修改")
                //     }
                //     else {
                //         message.error(rep.errorMessage, 3)
                //     }
                // })
                break;
        }
    }

    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent()
    };

    /**
         * 底部栏OK事件
         */
    const onFinish = (value: any) => {
        value.planStartTime = moment(value.planStartTime).format('yyyy-MM-DD');
        value.planEndTime = moment(value.planEndTime).format('yyyy-MM-DD');
        switch (props.operationType) {
            case OperationTypeEnum.add:
                onCreate(value);
                break;
            case OperationTypeEnum.edit:
                onUpdate(value);
                break;
        }
        setLoading(false)
    }

    const onCreate = (_param: any) => {
        setLoading(true)
        _projectService.create(_param).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3)
            }
            else {
                message.success("保存成功", 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })

    }

    const onUpdate = (_param: any) => {
        props.id && _projectService.update(props.id, _param).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3)
            }
            else {
                message.success("保存成功", 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }

    const onChange = (value: any, dateString: any) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    function uploadOnChange({ file, fileList }: UploadChangeParam) {
    }

    const onOk = (value: any) => {
        console.log('onOk: ', value);
        value = moment(value).format('YYYY-MM-DD') //这么解决的
    }


    return (
        <div>

            <Modal width={1000} getContainer={false} maskClosable={false} title={operationState.title} closable={false} visible={operationState.visible}
                footer={null}>
                <Form form={formData}
                    {...formItemSingleRankLayout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Row>
                        <Col span="24">
                            <Form.Item
                                name="name"
                                label="项目名称"
                                rules={[{ required: true }]}
                            >
                                <Input style={{ borderRadius: 8 }} disabled={props.operationType === OperationTypeEnum.edit} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Form.Item
                                label="负责人"
                                name="projectPrincipal"
                                rules={[{ required: true }]}
                            >
                                <Input style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Form.Item
                                label="项目状态"
                                name="projectStatus"
                                rules={[{ required: true }]}
                            >
                                <Select style={{ width: 180 }} allowClear={true} placeholder="请选择项目状态">
                                    {projectStatusEnumArray.map((item: any) => {
                                        return <Select.Option value={item.key}>{item.value}</Select.Option>;
                                    }
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="planStartTime"
                                label="项目开始时间"
                                rules={[{ required: true }]}
                                {...formItemDoubleRankLayout}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="planEndTime"
                                label="项目结束时间"
                                {...formItemDoubleRankLayout}
                            >
                                {<DatePicker
                                    onChange={onChange}
                                    onOk={onOk} />}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Form.Item
                                name="describe"
                                label="项目描述"
                            >
                                <TextArea style={{ borderRadius: 6 }} rows={14}></TextArea>
                                {/* <Editor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                /> */}
                                {/* <span>
                                    <Slate editor={editor} value={initialValue}
                                    >
                                        <Editable />
                                    </Slate>
                                </span> */}

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Form.Item
                                label="上传附件"
                                name="projectStatus"
                            >
                                <Upload action="" defaultFileList={defaultFileList} onChange={uploadOnChange}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" style={{ textAlign: 'right' }}>
                            <Form.Item {...tailLayout}>
                                <Button shape="round" onClick={() => onCancel()}>取消</Button>
                                <Button shape="round" style={{ margin: '0 8px' }} type="primary" loading={loading} htmlType="submit">保存</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
export default ProjectOperation;