import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';

@Entity({ schema: 'auth', name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  // ✅ FIX: Map camelCase to snake_case
  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  @Exclude()
  passwordHash: string;

  // ✅ FIX: Map camelCase to snake_case
  @Column({ type: 'varchar', length: 255, nullable: true, name: 'full_name' })
  fullName: string;

  // ✅ FIX: Map camelCase to snake_case
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  // ✅ FIX: Map camelCase to snake_case
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  // ✅ FIX: Map camelCase to snake_case
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  // ✅ FIX: Map camelCase to snake_case
  @Column({ type: 'timestamp', nullable: true, name: 'last_login' })
  lastLogin: Date;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'user_roles',
    schema: 'auth',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}