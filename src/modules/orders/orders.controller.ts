import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { IOrder } from "./orders.interfece";
import { AuthGuard } from "src/guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dtos/CreateOrder.dto";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @ApiBearerAuth()
    @HttpCode(201)
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto) {
        const {userId, products} = order;
        return this.ordersService.addOrder(userId, products);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Query('id') id: string) {
        return this.ordersService.getOrder(id);
    }
}