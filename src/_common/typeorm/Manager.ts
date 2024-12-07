import { BaseEntity } from "src/_base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Manager extends BaseEntity {
    @Column({ type: 'varchar', length: 150, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    lastname: string;

    @Column({ type: 'varchar', length: 50, nullable: false, comment: 'Format = 0905051232323' })
    phone: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    password: string;

}