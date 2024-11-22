import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enum/roles.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { CreateCategoryDto } from "./dtos/CreateCategory.dto";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    getCategories() {
        return this.categoriesService.getCategories();
    }

    @Get('seeder')
    seederExecute () {
        return this.categoriesService.seederExecute();
    }

    @ApiBearerAuth()
    @HttpCode(201)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    addCategories(@Body() category: CreateCategoryDto) {
        return this.categoriesService.addCategorie(category);
    }
}