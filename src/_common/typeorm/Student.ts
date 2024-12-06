import { BaseEntity } from "src/_base/entity/base.entity";
import { Class } from "./Class";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Parent } from "./Parent";
import { StudentStatus } from "../enums/StudentStatus.enum";
import { ExamResult } from "./ExamResult";

@Entity()
export class Student extends BaseEntity {

    @Column({ type: 'varchar', length: 50, nullable: false })
    public firstName: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public lastName: string;

    @Column({ type: 'timestamp', nullable: true })
    public dateOfBirth: Date;

    @Column({ type: 'enum', default: StudentStatus.ACTIVE, enum: StudentStatus })
    public status: StudentStatus;

    @ManyToOne(() => Class, (classes) => classes.students)
    public class: Class;

    @ManyToMany(() => Parent, (parent) => parent.students)
    public parents: Parent[];

    @OneToMany(() => ExamResult , (examResult) => examResult.student)
    public examResults : ExamResult[];

}