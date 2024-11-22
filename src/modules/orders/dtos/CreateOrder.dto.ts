import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Products } from "src/entities/products.entity";
import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class PartialProductDto extends PartialType(Products) {} ;

export class CreateOrderDto {

    @IsNotEmpty()
    @IsUUID('all')
    @ApiProperty({
        description: 'Este dato es obligatorio y debe ser un UUID válido. El usuario debe existir en la BD',
        example: '4f9e648c-5a33-4ce6-ac75-9c2923df30ce'
    })
    userId: string;
    
    @IsArray()
    @ArrayMinSize(1, { message: 'The products array must contain at least one product' })
    @ValidateNested({ each: true })
    @Type(() => PartialProductDto)
    @ApiProperty({
        description: 'Recibe un array con los id\'s de los productos a agregar a la orden. Al menos debe tener un producto',
        example: `{"id": "0fabdee4-f54d-402b-b955-4d7fcf0165f8"},{"id": "f492b34e-e1b6-40b2-be2c-25eca589bc34"},{"id": "29ef9d74-681d-4a90-a539-129c408296b7"}`
    })
    products: PartialProductDto[]
}