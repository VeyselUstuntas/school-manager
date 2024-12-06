import { BaseEntity } from "src/_base/entity/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Lesson } from "./Lesson";
import { ExamResult } from "./ExamResult";

@Entity()
export class Exam extends BaseEntity {

    @Column()
    public name: string;

    @ManyToOne(() => Lesson, (lesson) => lesson.exams)
    public lesson: Lesson;

    @Column({ type: 'timestamp', nullable: true })
    public date: Date;

    @OneToMany(() => ExamResult, (examResult) => examResult.exam)
    public results: ExamResult[];

}