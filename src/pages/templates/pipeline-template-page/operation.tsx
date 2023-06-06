import "../../drawer.less";

import {
  ApplicationLevelMap,
  ApplicationStateMap,
} from "@/domain/maps/application-map";
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import {
  formItemDoubleRankLayout,
  formItemSingleRankLayout,
  tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IBuildImageService } from "@/domain/buildimages/ibuildimage-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineStage from "@/pages/pipeline-operation-component-page/pipeline-stage"
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

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

const Operation = (props: any) => {


  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [formData] = Form.useForm();
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onLoad();
  }, [formData]);

  /**
   * 编辑获取一个表单
   * @param _id
   */
  const onLoad = () => {
    switch (props.operationType) {
      case OperationTypeEnum.add:
        // formData.setFieldsValue(initformData);
        break;
      case OperationTypeEnum.view:
        break;
      case OperationTypeEnum.edit:
        props.id &&
          _applicationService.getDetail(props.id).then((rep) => {
            if (rep.success) {
              formData.setFieldsValue(rep.result.application);
            } else {
              message.error(rep.errorMessage, 3);
            }
          });
        break;
    }
  };


  /**
   * 底部栏OK事件
   */
  const onFinish = () => {
    formData.validateFields().then((values) => {
      let param = formData.getFieldsValue();
      switch (props.operationType) {
        case OperationTypeEnum.add:
          onCreate(param);
          break;
        case OperationTypeEnum.edit:
          onUpdate(param);
          break;
      }
    })
      .catch((error) => {
      });
  };
  const onCreate = (_param: any) => {
    setLoading(true);
    _applicationService
      .createApplication(_param)
      .then((rep) => {
        if (!rep.success) {
          message.error(rep.errorMessage, 3);
        } else {
          message.success("保存成功", 3);
          props.onCallbackEvent && props.onCallbackEvent();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onUpdate = (_param: any) => {
    props.id &&
      _applicationService
        .updateApplication(props.id, _param)
        .then((rep) => {
          if (!rep.success) {
            message.error(rep.errorMessage, 3);
          } else {
            message.success("保存成功", 3);
            props.onCallbackEvent && props.onCallbackEvent();
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <div style={{ height: "100%" }}>
      <PipelineStage stageArray={[]} />
    </div>
  );
};
export default Operation;
