import { BaseEntity } from "src/_base/entity/base.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Lesson } from "./Lesson";
import { Exam } from "./Exam";
import { Student } from "./Student";

@Entity()
export class ExamResult extends BaseEntity{

    @ManyToOne(() => Exam, (exam) => exam.results)
    public exam : Exam;

    @ManyToOne(() => Student, (student) => student.examResults)
    public student : Student;

    @Column({type:'integer',nullable:false, default:0})
    public score : number;

}