import { IsEmail, IsNumber, IsString, Length } from "class-validator";

export class ModifyUserDto {
    
    @IsString()
    @Length(3, 80)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(3, 80)
    address: string;

    @IsNumber()
    phone: number;

    @IsString()
    @Length(5, 20)
    country: string;

    @IsString()
    @Length(5, 20)
    city: string;
}