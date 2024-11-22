import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { IUser } from "./user.interface";
import { User } from "src/entities/users.entity";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { ModifyUserDto } from "./dtos/ModifyUser.dto";

@Injectable()

export class UsersService {
          
    constructor(private userRepository: UsersRepository) {}

    async getUsers () {
        const users = await this.userRepository.getUsers();
        return users;
    }

    getUserById(id: string) {
        return this.userRepository.getUserById(id);
    }

    updateUser(id: string, user: ModifyUserDto) {
        return this.userRepository.updateUser(id, user);
    }

    deleteUser(id: number) {
        return this.userRepository.deleteUser(id);
    }
}