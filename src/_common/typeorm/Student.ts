import { BaseEntity } from "src/_base/entity/base.entity";
import { Class } from "./Class";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Parent } from "./Parent";
import { StudentStatus } from "../enums/StudentStatus.enum";
import { ExamResult } from "./ExamResult";

@Entity()
export class Student extends BaseEntity {

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    lastname: string;

    @Column({ type: 'timestamp', nullable: true })
    dateOfBirth: Date;

    @Column({ type: 'enum', default: StudentStatus.ACTIVE, enum: StudentStatus })
    status: StudentStatus;

    @ManyToOne(() => Class, (classes) => classes.students)
    class: Class;

    @ManyToMany(() => Parent, (parent) => parent.students)
    parents: Parent[];

    @OneToMany(() => ExamResult, (examResult) => examResult.student)
    examResults: ExamResult[];

}