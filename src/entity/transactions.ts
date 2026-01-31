import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { RiskAssessment } from "./risk_assessment";

@Entity("transactions")
@Index(["user", "createdAt"])
@Index(["status"])
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, user => user.transactions, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column("numeric", { precision: 14, scale: 2 })
    amount!: number;

    @Column({ length: 3 })
    currency!: string;

    @Column({
        type: "enum",
        enum: ["PENDING", "PROCESSED", "FAILED"],
        default: "PENDING",
    })
    status!: "PENDING" | "PROCESSED" | "FAILED";

    @Column({ nullable: true })
    source!: string;

    @Column({ name: "device_id", nullable: true })
    deviceId!: string;

    @Column({ name: "ip_address", type: "inet", nullable: true })
    ipAddress!: string;

    @Column({ name: "country_code", length: 2, nullable: true })
    countryCode!: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    // relations
    @OneToOne(() => RiskAssessment, ra => ra.transaction)
    riskAssessment!: RiskAssessment;
}
