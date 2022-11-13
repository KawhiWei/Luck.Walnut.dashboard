import { useEffect, useState } from "react";

import { Drawer } from "antd";
import { IOperationConfig } from "@/shared/operation/operationConfig";

interface IProp {
  /**
   * 阶段信息
   */
  id: string;

  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;
}

const ExecutedHistory = (props: IProp) => {
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onLoad();
  }, []);

  /**
   * 编辑获取一个表单
   * @param _id
   */
  const onLoad = () => {
    editOperationState(true);
  };

  /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
    if (!_visible) {
      props.onCallbackEvent && props.onCallbackEvent();
    }
  };
  return (
    <div>
      <Drawer
        title="构建历史"
        width={1400}
        placement="right"
        onClose={() => editOperationState(false)}
        open={operationState.visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default ExecutedHistory;
