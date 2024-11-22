import { Check, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Orders } from "./orders.entity";

@Entity({
    name: 'users'
})
@Check('"name" != null')
@Check('"email" != null')
@Check('"password" != null')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        length: 50,
    })
    name: string

    @Column({
        length: 50,
        unique: true
    })
    email: string

    @Column({
        length: 100
    })
    password: string

    @Column({
        type: "int"
    })
    phone: number

    @Column({
        length: 50
    })
    country: string

    @Column()
    address: string

    @Column({
        length: 50
    })
    city: string

    @Column({
        default: false
    })
    isAdmin: boolean

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({name: 'oder_id'})
    orders: Orders[]
}