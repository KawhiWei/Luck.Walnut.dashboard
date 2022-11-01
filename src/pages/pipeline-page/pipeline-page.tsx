import { IApplication } from "@/domain/applications/application";

interface IProp {
  /**
   * 应用信息
   */
  applicationData?: IApplication;
}

/***
 * 应用流水线设计
 */
const PipelinePage = (props: IProp) => {



  
  return <div>应用部署流水线</div>;
};

export default PipelinePage;
