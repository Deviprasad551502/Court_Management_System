import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CourtType } from './court-type.entity';
import { Court } from './court.entity';

@Entity('court_systems', { schema: 'court' })
export class CourtSystem {
  @PrimaryColumn({ type: 'varchar', length: 25 })
  court_system_id: string;

  @Column({ type: 'varchar', length: 25 })
  court_type_id: string;

  @Column({ type: 'varchar', length: 255 })
  court_system_name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => CourtType, (courtType) => courtType.courtSystems, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'court_type_id' })
  courtType: CourtType;

  @OneToMany(() => Court, (court) => court.courtSystem)
  courts: Court[];
}
