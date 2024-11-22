import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { IProduct } from "./product.interface";
import { Products } from "src/entities/products.entity";
import { CreateProductDto } from "./dtos/CreateProduct.dto";

@Injectable()

export class ProductsService {
    
    constructor(private productsRepository: ProductsRepository) {}

    seederExecute () {
        return this.productsRepository.seederExecute();
    }

    getProducts () {
        const products = this.productsRepository.getProducts();
        return products;
    }

    getProductById(id: string) {
        return this.productsRepository.getProductById(id);
    }

    createProduct(product: CreateProductDto) {
        return this.productsRepository.createProduct(product);
    }

    updateProduct(id: string, product: Products) {
        return this.productsRepository.updateProduct(id, product);
    }

    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id);
    }
}