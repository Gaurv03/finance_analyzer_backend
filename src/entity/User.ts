import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum UserRole {
    ADMIN = 'ADMIN',
    ANALYST = 'ANALYST',
    AUDITOR = 'AUDITOR'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar" })
    firstName!: string

    @Column({ type: "varchar" })
    lastName!: string

    @Column({ type: "varchar", unique: true })
    email!: string

    @Column({ type: "varchar" })
    password!: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.AUDITOR
    })
    role!: UserRole
}



