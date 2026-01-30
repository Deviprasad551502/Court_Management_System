import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Court } from './court.entity';
import { Location } from './location.entity';

@Entity('court_location_map', { schema: 'court' })
@Unique(['court_id', 'court_location_id'])
export class CourtLocationMap {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 25 })
  court_id: string;

  @Column({ type: 'varchar', length: 25 })
  court_location_id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Court, (court) => court.courtLocationMaps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'court_id' })
  court: Court;

  @ManyToOne(() => Location, (location) => location.courtLocationMaps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'court_location_id' })
  location: Location;
}
