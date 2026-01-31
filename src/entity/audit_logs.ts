import { CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { User } from "./user";

@Entity("audit_logs")
@Index(["actor"])
@Index(["entityType", "entityId"])
@Index(["createdAt"])
export class AuditLog {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "actor_id" })
    actor!: User | null;

    @Column()
    action!: string;

    @Column({ name: "entity_type", nullable: true })
    entityType!: string;

    @Column({ name: "entity_id", type: "uuid", nullable: true })
    entityId!: string;

    @Column({ type: "jsonb", nullable: true })
    metadata!: Record<string, any>;

    @Column({ name: "request_id", nullable: true })
    requestId!: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
}
