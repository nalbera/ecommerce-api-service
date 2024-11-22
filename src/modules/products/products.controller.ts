import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { IProduct } from "./product.interface";
import { Products } from "src/entities/products.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enum/roles.enum";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "./dtos/CreateProduct.dto";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @HttpCode(200)
    @Get()
    getProducts() {
        return this.productsService.getProducts()
    }

    @Get('seeder')
    seederExecute () {
        return this.productsService.seederExecute();
    }

    @HttpCode(200)
    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

    @ApiBearerAuth()
    @HttpCode(201)
    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    createProduct(@Body() product: CreateProductDto) {
        return this.productsService.createProduct(product);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Body() product: Products, @Param('id') id: string) {
        return this.productsService.updateProduct(id, product);
    }

    @HttpCode(200)
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}