import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./users.entity";
import { OrderDetail } from "./orderDetail.entity";

@Entity({
    name: 'orders'
})
export class Orders {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    date: Date

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToOne(() => OrderDetail, (orderDetails) => orderDetails.order)
    orderDetail: OrderDetail
}