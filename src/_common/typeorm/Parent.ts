import { Column, Entity, ManyToMany } from "typeorm";
import { Student } from "./Student";
import { BaseEntity } from "src/_base/entity/base.entity";

@Entity()
export class Parent extends BaseEntity{
    @Column({ type: 'varchar', length: 50, nullable: false })
    public firstName: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public lastName: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    public email: string;

    @Column({ type: 'varchar', length: 50, nullable: false, comment: 'Format = 0905051232323' })
    public phone: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    public password: string;

    @ManyToMany(() => Student, (student) => student.parents)
    public students: Student[];

}