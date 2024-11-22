import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/users.entity";
import { Repository, UpdateResult } from "typeorm";
import { LoginUserDto } from "../../modules/auth/dtos/LoginUser.dto";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { ModifyUserDto } from "./dtos/ModifyUser.dto";
import { SignUpUserDto } from "./dtos/SignUpUser.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Role } from "../../enum/roles.enum";

@Injectable()
export class UsersRepository {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async getUsers () {
        
        try {

            const findUsers = await this.userRepository.find({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    country: true,
                    address: true,
                    city: true
                }
            });
            
            if(!findUsers.length) {
                throw new Error();
            }

            return findUsers;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No users found'
                },
                HttpStatus.NOT_FOUND
            )
        }

    }

    async getUserById(id: string): Promise<User[] | string> {
        
        try {

            const user = await this.userRepository.find({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    country: true,
                    address: true,
                    city: true
                },
                relations: {
                    orders: true
                }
            });
    
            if(!user.length) {
                throw new Error();
            }
    
            return user
            
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'User not found'
                },
                HttpStatus.NOT_FOUND
            )
        }

    }

    async updateUser(id: string, user: ModifyUserDto): Promise<ModifyUserDto> {
        
        try {

            const userModified = await this.userRepository.update(
                {id: id},
                {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    country: user.country,
                    address: user.address,
                    city: user.city
                }
            );
            
            if(userModified.affected === 0) {
                throw new Error();
            }

            return user;
            
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Could not be modified'
                },
                HttpStatus.BAD_REQUEST
            )
        }

    }

    async deleteUser(id: number): Promise<string> {

        try {
            await this.userRepository
                        .createQueryBuilder()
                        .delete()
                        .from(User)
                        .where("id = :id", {id: id})
                        .execute()
    
            return 'User successfully deleted';
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Could not be deleted'
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async signUp(body: SignUpUserDto): Promise<Object> {
        try {
            
            const findUser = await this.userRepository.findOne({where:{email: body.email}});

            if(findUser) throw new Error('Email already exists');
            
            if(body.password !== body.passwordConfirm) throw new Error('Passwords must be the same');

            const hashedPassword = await bcrypt.hash(body.password, 10);
            
            const newUser = await this.userRepository.save({...body, password: hashedPassword});
            const user = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                country: newUser.country,
                address: newUser.address,
                city: newUser.city
            };

            return user;

        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: error.message
                },
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async signIn(body: LoginUserDto): Promise<Object> {
        
        try {

            const findUser = await this.userRepository.findOne({where: {email: body.email}});
            
            let passwordValid: boolean;
            
            if(findUser) {
                passwordValid = await bcrypt.compare(body.password, findUser.password);
            }
            
            if(!findUser || !passwordValid) {
                throw new Error();
            }
            
            const userPayload = {
                subscribe: findUser.id,
                id: findUser.id,
                email: findUser.email,
                roles: [findUser.isAdmin ? Role.Admin : Role.User]
            }

            const token = this.jwtService.sign(userPayload);

            return {
                success: 'User logged in successfully',
                token
            };
            
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Incorrect email or password'
                },
                HttpStatus.UNAUTHORIZED
            )
        }
    }
}