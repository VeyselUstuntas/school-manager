import { BaseEntity } from "src/_base/entity/base.entity"
import { Column, Entity, OneToMany } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Class extends BaseEntity {

    @Column({ type: 'varchar', length: 50 })
    public name: string;

    @Column({ type: 'varchar', length: 15 })
    public code: string;

    @Column({ type: 'varchar', length: 200 })
    public description: string;

    @OneToMany(() => Student, (student) => student.class)
    public students: Student[];

    //teacher
    // @ManyToMany(() => Teacher, (teacher) => teacher.class)
    // public teachers: Teacher[];


}