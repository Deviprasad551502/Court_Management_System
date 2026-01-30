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
import { State } from './state.entity';
import { CourtLocationMap } from './court-location-map.entity';

@Entity('locations', { schema: 'court' })
export class Location {
  @PrimaryColumn({ type: 'varchar', length: 25 })
  court_location_id: string;

  @Column({ type: 'integer' })
  state_id: number;

  @Column({ type: 'varchar', length: 255 })
  street_address_1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  street_address_2: string | null;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => State, (state) => state.locations, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @OneToMany(() => CourtLocationMap, (map) => map.location)
  courtLocationMaps: CourtLocationMap[];
}
