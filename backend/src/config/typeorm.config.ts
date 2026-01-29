import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CourtType } from 'src/entities/court-type.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: false,
};
