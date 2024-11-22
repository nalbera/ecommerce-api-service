import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "src/modules/users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, UsersRepository],
    controllers: [AuthController],
})

export class AuthModule {}