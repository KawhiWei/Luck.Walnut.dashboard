import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { BuildImageApi } from "@/constans/api";
import { IBuildImageService } from "./ibuildimage-service";
import { IBuildImageVersionBaseDto } from "./buildimage-dto";

export class BuildImageService extends BaseService implements IBuildImageService {
    getVersionList(_imageId: string): Promise<IServerReturn<IBuildImageVersionBaseDto>> {
        return this.dataRequest.getRequest(`${BuildImageApi.buildImage}/${_imageId}/version/list`,)
    }

}