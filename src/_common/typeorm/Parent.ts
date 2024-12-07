import { Column, Entity, ManyToMany } from "typeorm";
import { Student } from "./Student";
import { BaseEntity } from "src/_base/entity/base.entity";

@Entity()
export class Parent extends BaseEntity {
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    lastname: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 50, nullable: false, comment: 'Format = 0905051232323' })
    phone: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    password: string;

    @ManyToMany(() => Student, (student) => student.parents)
    students: Student[];

}