import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";
import { MoreThan, Repository } from "typeorm";
import { IOrder } from "./orders.interfece";
import { Orders } from "src/entities/orders.entity";
import { OrderDetail } from "src/entities/orderDetail.entity";

@Injectable()
export class OrdersRepository {
    
    constructor(
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>
    ) {}

    async addOrder(userId: string, products: any) {

        try {
            const user = await this.usersRepository.findOneBy({id: userId});
    
            if(!user) throw new Error('User not found');
            
            const order = new Orders();
            order.date = new Date();
            order.user = user;
            
            const newOrder = await this.ordersRepository.save(order);
    
            let total = 0;
            
            const productsArray = await Promise.all(
                products.map(async (product) => {
                    const findProduct = await this.productsRepository.findOneBy({id: product.id});
                      
                    total += Number(findProduct.price);
    
                    await this.productsRepository.update(
                        {id: product.id},
                        {stock: findProduct.stock - 1}
                    );
    
                    return findProduct;
    
                })
            )
    
            const orderDetail = new OrderDetail();
            orderDetail.price = Number(Number(total).toFixed(2));
            orderDetail.porducts = productsArray;
            orderDetail.order = newOrder;
    
            await this.orderDetailRepository.save(orderDetail);
    
            return await this.ordersRepository.find(
                {
                    where: { id: newOrder.id },
                    relations: {
                        orderDetail: true
                    }
                }
            )
            
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

    async getOrder(id: string) {
        try {
            const order = await this.ordersRepository.findOne({
                where: { id },
                relations: {
                    orderDetail: {
                        porducts: true
                    }
                }
            });
    
            if (!order) throw new Error('Order not found');
    
            return order;
            
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