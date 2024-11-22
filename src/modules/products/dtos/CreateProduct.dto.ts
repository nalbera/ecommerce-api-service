import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Categories } from "src/entities/categories.entity";


export class CreateProductDto {

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    @ApiProperty({
        description:"El nombre del producto debe ser un string de no mas de 50 caracteres",
        example: "Monitor MSI Pro MP2"
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "24''"
    })
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 180000
    })
    price: number;

    @IsString()
    @ApiProperty({
        description: 'Dirección url en donde se encuentra la imagen',
        example: 'https://asset.msi.com/resize/image/global/product/product_1725522011404d77cad4fc21ac3328632f140c5631.png62405b38c58fe0f07fcef2367d8a9ba1/600.png'
    })
    imgUrl: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 20
    })
    stock: number;

    @IsString()
    @ApiProperty({
        description: 'Recibe el UUID de la categoría a la que corresponde el producto',
        example: 'f0adaa32-c331-4cfe-b6e1-61e147e09427'
    })
    categories: Categories;
}