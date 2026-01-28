import { Entity, PrimaryColumn, Column, Check } from 'typeorm';

@Entity({ schema: 'court', name: 'court_types' })
@Check(`id LIKE 'COTP%'`)
export class CourtType {
  @PrimaryColumn({ length: 25 })
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
