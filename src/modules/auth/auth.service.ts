import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { LoginUserDto } from "./dtos/LoginUser.dto";
import { SignUpUserDto } from "../users/dtos/SignUpUser.dto";


@Injectable()
export class AuthService {
      
    constructor(private readonly userRepository: UsersRepository) {}

    signIn(body: LoginUserDto) {
        return this.userRepository.signIn(body);
    }

    signUp(body: SignUpUserDto) {
        return this.userRepository.signUp(body);
    }
}