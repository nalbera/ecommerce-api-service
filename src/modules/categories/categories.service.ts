import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dtos/CreateCategory.dto";

@Injectable()

export class CategoriesService {

    constructor(private categoriesRepository: CategoriesRepository) {}

    seederExecute () {
        return this.categoriesRepository.seederExecute();
    }
    
    getCategories () {
        return this.categoriesRepository.getCategories();
    }
    
    addCategorie (category: CreateCategoryDto) {
        return this.categoriesRepository.createCategory(category);
    }
}