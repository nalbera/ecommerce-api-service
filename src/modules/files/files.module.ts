import { Module } from "@nestjs/common";
import { FilesServices } from "./files.service";
import { FilesRepository } from "./files.repository";
import { FilesController } from "./files.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { CloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryService } from "src/utils/cloudinary.service";

@Module({
    imports: [TypeOrmModule.forFeature([Products])],
    providers: [FilesServices, FilesRepository, CloudinaryConfig, CloudinaryService],
    controllers: [FilesController]
})
export class FilesModule {}