import { IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { CreateUserDto } from "./CreateUser.dto";

export class SignUpUserDto extends CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z](?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/, {
      message: 'The password must have at least one lowercase letter, one uppercase letter, one number and one of the following special characters: !@#$%^&*',
    })
    @Length(8, 15)
    passwordConfirm: string;
}