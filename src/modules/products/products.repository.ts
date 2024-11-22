import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IProduct } from "./product.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";
import { Categories } from "src/entities/categories.entity";
import * as data from '../../utils/data.json';
import { CreateProductDto } from "./dtos/CreateProduct.dto";

@Injectable()
export class ProductsRepository {
    

    constructor(
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
        @InjectRepository(Categories)
        private categoriesRepository: Repository<Categories>
    ){}

    async getProducts () {
        try {
            const products = await this.productsRepository.find({
                relations: {
                    categories: true
                }
            });
            
            if(!products.length) throw new Error();

            return products;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Not products found'
                },
                HttpStatus.NOT_FOUND
            )
        }
    }

    async getProductById(id: string): Promise<IProduct[] | string> {
        try {
            
            const product = await this.productsRepository.find({
                where: { id: id },
                relations: {
                    categories: true
                }
            });
    
            if(!product.length) throw new Error();
    
            return product;
            
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Product not found'
                },
                HttpStatus.NOT_FOUND
            )
        }
    }

    async createProduct(product: CreateProductDto): Promise<Products> {
        
        try {

            const newProduct = new Products();
            newProduct.name = product.name;
            newProduct.description = product.description;
            newProduct.price = product.price;
            newProduct.imgUrl = product.imgUrl;
            newProduct.stock = product.stock;
            newProduct.categories = product.categories;
    
            await this.productsRepository.save(newProduct);
            
            return newProduct;
            
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

    async updateProduct(id: string, product: Products): Promise<Products> {

        try {

            const productModified = await this.productsRepository.update(
                {id: id},
                {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    imgUrl: product.imgUrl,
                    stock: product.stock,
                    categories: product.categories
                }
            );
    
            if(productModified.affected === 0) throw new Error();

            return product;
            
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

    async deleteProduct(id: string) {
        try {

            await this.productsRepository
                        .createQueryBuilder()
                        .delete()
                        .from(Products)
                        .where("id = :id", {id: id})
                        .execute()
            
            return 'Product successfully deleted'

        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: error.message
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async seederExecute () {

        try {
            const categories = await this.categoriesRepository.find();
            
            data?.map(async (element) => {
                const category = categories.find((category) => category.name === element.category);
                
                const product = new Products();
    
                product.name = element.name;
                product.description = element.description;
                product.price = element.price;
                product.stock = element.stock;
                product.categories = category
    
                await this.productsRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Products)
                    .values(product)
                    .execute();
            });
    
            return 'Productos agregados'
            
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: error.message
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}