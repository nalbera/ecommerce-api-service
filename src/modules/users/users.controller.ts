import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/guards/auth.guard";
import { ModifyUserDto } from "./dtos/ModifyUser.dto";
import { Role } from "src/enum/roles.enum";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers() {
        return this.usersService.getUsers();
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Get(':id')
    @Roles(Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id')
    @Roles(Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    updateUser(@Body() user: ModifyUserDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.updateUser(id, user);
    }
    
    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(Number(id));
    }
}