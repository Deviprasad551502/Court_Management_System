import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { CourtSystem } from './court-system.entity';

@Entity({ name: 'court_types', schema: 'court' })
export class CourtType {
  @PrimaryColumn({ length: 20 })
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => CourtSystem, (courtSystem) => courtSystem.courtType)
  courtSystems: CourtSystem[];
}
