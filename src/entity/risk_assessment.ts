import { Entity, Index, PrimaryGeneratedColumn, OneToOne, Column, CreateDateColumn, JoinColumn } from "typeorm";
import { Transaction } from "./transactions";

@Entity("risk_assessments")
@Index(["riskLevel"])
export class RiskAssessment {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @OneToOne(() => Transaction, tx => tx.riskAssessment, { nullable: false })
    @JoinColumn({ name: "transaction_id" })
    transaction!: Transaction;

    @Column({ name: "base_score", type: "int" })
    baseScore!: number;

    @Column({ name: "ai_score", type: "int", nullable: true })
    aiScore!: number | null;

    @Column({ name: "final_score", type: "int" })
    finalScore!: number;

    @Column({
        name: "risk_level",
        type: "enum",
        enum: ["LOW", "MEDIUM", "HIGH"],
    })
    riskLevel!: "LOW" | "MEDIUM" | "HIGH";

    @Column({ name: "rule_triggers", type: "jsonb" })
    ruleTriggers!: Record<string, any>;

    @Column({ name: "ai_explanation", type: "text", nullable: true })
    aiExplanation!: string | null;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
}
