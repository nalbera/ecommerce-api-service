import { HttpException, HttpStatus, Injectable, ParseUUIDPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";

@Injectable()
export class FilesRepository {

    constructor(
        @InjectRepository(Products)
        private productsRepository: Repository<Products>
    ) {}

    async updateImage(productId: string, url: string) {
        try {
            await this.productsRepository.update(
                {id: productId},
                {imgUrl: url}
            );
    
            return 'Image added'
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
}