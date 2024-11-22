import { Check, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Categories } from "./categories.entity";
import { OrderDetail } from "./orderDetail.entity";

@Entity({
    name: 'products'
})
@Check('"name" != null')
@Check('"description" != null')
@Check('"price" != null')
@Check('"stock" != null')
export class Products {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        length: 50
    })
    name: string

    @Column({
        type: 'text'
    })
    description: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number

    @Column()
    stock: number

    @Column({
        type: 'text',
        default: 'https://cdn.pixabay.com/photo/2013/04/01/21/30/photo-99135_1280.png'
    })
    imgUrl: string

    @ManyToOne(() => Categories, (categories) => categories.products)
    @JoinColumn({name: 'category_id'})
    categories: Categories

    @ManyToMany(() => OrderDetail)
    orderDetails: OrderDetail[]
}