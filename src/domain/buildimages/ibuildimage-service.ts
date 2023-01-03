import { IBuildImageVersionBaseDto } from "./buildimage-dto";
import { IServerReturn } from "@/shared/entity";

export interface IBuildImageService {

    getVersionList(_imageId: string): Promise<IServerReturn<IBuildImageVersionBaseDto>>;
    
}