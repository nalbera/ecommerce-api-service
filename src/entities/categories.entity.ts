import { Check, Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Products } from "./products.entity";

@Entity({
    name: 'categories'
})
@Check('"name" != null')
export class Categories {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        length: 50,
        type: 'varchar',
        unique: true
    })
    name: string

    @OneToMany(() => Products, (products) => products.categories)
    @JoinColumn()
    products: Products[]

}