import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z](?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/, {
      message: 'The password must have at least one lowercase letter, one uppercase letter, one number and one of the following special characters: !@#$%^&*',
    })
    @Length(8, 15)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    country: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    city: string;
}