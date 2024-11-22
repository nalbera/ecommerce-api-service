import { Controller, FileTypeValidator, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesServices } from "./files.service";
import { MaxSizeValidatorPipe } from "src/pipes/max-size-pipe-validator.pipe";
import { AuthGuard } from "src/guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enum/roles.enum";
import { RolesGuard } from "src/guards/roles.guard";

@ApiTags('Files')
@Controller('files')
export class FilesController {

    constructor(
        private readonly filesService: FilesServices
    ) {}

    @ApiBearerAuth()
    @HttpCode(201)
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(MaxSizeValidatorPipe)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('upload-image/:productId')
    async uploadFile(
        @Param('productId', ParseUUIDPipe) productId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/,
                    })
                ]
            })
        ) file: Express.Multer.File
    ) {
        return this.filesService.uploadFile(productId, file);
    }
}