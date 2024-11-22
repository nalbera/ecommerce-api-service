import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @MaxLength(50)
    @ApiProperty({
        example: 'Smart Tv'
    })
    name: string;
}