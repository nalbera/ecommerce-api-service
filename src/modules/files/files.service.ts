import { Injectable, ParseUUIDPipe } from "@nestjs/common";
import { FilesRepository } from "./files.repository";
import { CloudinaryService } from "src/utils/cloudinary.service";

@Injectable()
export class FilesServices {

    constructor(
        private readonly filesRepository: FilesRepository,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async uploadFile(productId: string, file: Express.Multer.File) {
        
        const image = await this.cloudinaryService.uploadImage(file);

        return this.filesRepository.updateImage(productId, image.url);
    }
}