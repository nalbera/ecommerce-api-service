import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dtos/LoginUser.dto";
import { SignUpUserDto } from "src/modules/users/dtos/SignUpUser.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signUp(@Body() body: SignUpUserDto) {
        return this.authService.signUp(body);
    }

    @Post('signin')
    signIn(@Body() body: LoginUserDto) {
        return this.authService.signIn(body);
    }
}