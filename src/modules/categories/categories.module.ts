import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";
import { CategoriesController } from "./categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Categories])],
    providers: [CategoriesService, CategoriesRepository],
    controllers: [CategoriesController]
})

export class CategoriesModule {}