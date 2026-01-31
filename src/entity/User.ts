import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Transaction } from "./transactions"

export enum UserRole {
    ADMIN = 'ADMIN',
    ANALYST = 'ANALYST',
    AUDITOR = 'AUDITOR'
}

@Entity()
@Index(["email"], { unique: true })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "varchar" })
    firstName!: string

    @Column({ type: "varchar" })
    lastName!: string

    @Column({ type: "varchar", unique: true })
    email!: string

    @Column({ type: "varchar", name: "password_hash" })
    passwordHash!: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.AUDITOR
    })
    role!: UserRole

    @Column({ default: true })
    isActive!: boolean;

    @Column({ default: 0 })
    tokenVersion!: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    // relations
    @OneToMany(() => Transaction, tx => tx.user)
    transactions!: Transaction[];
}



