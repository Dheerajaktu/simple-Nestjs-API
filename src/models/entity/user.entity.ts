import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class dbuser {
    @PrimaryGeneratedColumn()
    id: number


    @Column({ select: false })
    username: string

    @Column({ nullable: true, select: false })
    name: string


    @Column({ nullable: true, select: false })
    imageSmall: string

    @Column({ nullable: true, select: false })
    imageLarge: string

    @Column({ select: false })
    password: string

    @Column({ select: false })
    email: string

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updateAt: Date

}