import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'court', name: 'court_types' })
export class CourtType {
  @PrimaryColumn({ length: 30 })
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
