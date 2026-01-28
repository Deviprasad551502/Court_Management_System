import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  Check,
} from 'typeorm';

@Entity({ schema: 'court', name: 'court_types' })
@Check(`id LIKE 'COTP%'`)
export class CourtType {
  @PrimaryColumn({ length: 25 })
  id: string;

  @Column({ length: 100, unique: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;
}
