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
import { CourtSystem } from './court-system.entity';
import { CourtLocationMap } from './court-location-map.entity';

@Entity('courts', { schema: 'court' })
export class Court {
  @PrimaryColumn({ type: 'varchar', length: 25 })
  court_id: string;

  @Column({ type: 'varchar', length: 25 })
  court_system_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => CourtSystem, (courtSystem) => courtSystem.courts, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'court_system_id' })
  courtSystem: CourtSystem;

  @OneToMany(() => CourtLocationMap, (map) => map.court)
  courtLocationMaps: CourtLocationMap[];
}
