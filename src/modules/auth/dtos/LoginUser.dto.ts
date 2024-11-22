import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({
        description: 'El email debe ser válido',
        example: 'test@example.com'
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @ApiProperty({
        description: `
            La password debe tener entre 8 y 15 caracteres, debe tener al menos una letra minúscula,
            una letra mayúscula, un número y uno de los siguientes caracteres especiales !@#$%^&*
        `,
        example: 'siGnos12!'
    })
    password: string;
}