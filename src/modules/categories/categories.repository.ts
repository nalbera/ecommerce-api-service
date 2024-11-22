import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import * as data from '../../utils/data.json'
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dtos/CreateCategory.dto";

@Injectable()
export class CategoriesRepository {
       
    constructor(
        @InjectRepository(Categories)
        private categoriesRepository: Repository<Categories>
    ) {}

    async seederExecute() {
        try {
            data?.map(async (element) => {
                await this.categoriesRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Categories)
                    .values({name: element.category})
                    .orIgnore()
                    .execute();
            });
            return 'Categories added';
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
    
    async getCategories () {
        return await this.categoriesRepository.find();
    }

    async createCategory(category: CreateCategoryDto) {
        try {
            
            const newCatgory = new Categories;
            newCatgory.name = category.name;

            await this.categoriesRepository.save(newCatgory);

            return newCatgory;

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