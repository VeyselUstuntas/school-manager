import { BaseEntity } from "src/_base/entity/base.entity";
import {Column, Entity } from "typeorm";

@Entity()
export class Employee extends BaseEntity{
    
    @Column({ type: 'varchar' })
    public name: string;

    @Column({ type: 'varchar' })
    public lastname: string;
}