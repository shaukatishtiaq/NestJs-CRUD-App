import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    s_no : number;

    @Column()
    name : string;

    @Column()
    city : string;

    @Column()
    phone_no: string;

    @Column()
    aadhaar: string;
    
    @CreateDateColumn()
    date: Date;
}