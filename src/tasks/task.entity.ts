import { BaseEntity, Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column()
    description: string;

    @Column()
    status : TaskStatus;

    @Column({nullable: true})
    ct: string;
}