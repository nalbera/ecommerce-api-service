import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";
import { Orders } from "src/entities/orders.entity";
import { OrderDetail } from "src/entities/orderDetail.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Products, User, Orders, OrderDetail])],
    providers:[OrdersService, OrdersRepository],
    controllers:[OrdersController]
})
export class OrdersModule {}