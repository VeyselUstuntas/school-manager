import { BaseEntity } from "src/_base/entity/base.entity";
import { Entity, OneToMany } from "typeorm";
import { Exam } from "./Exam";

@Entity()
export class Lesson extends BaseEntity {

    name: string;

    @OneToMany(() => Exam, (exam) => exam.lesson)
    exams: Exam[];
}