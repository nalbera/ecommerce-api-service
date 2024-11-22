import { Check, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from 'uuid';
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";

@Entity({
    name: 'orderdetails'
})
@Check('"price" != null')
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number

    @OneToOne(() => Orders, (order) => order.orderDetail)
    @JoinColumn({name: 'order_id'})
    order: Orders

    @ManyToMany(() => Products)
    @JoinTable({
        name: 'orderdetails_products',
        joinColumn:{
            name: 'product_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'orderdetail_id',
            referencedColumnName: 'id'
        }
    })
    porducts: Products[]
}