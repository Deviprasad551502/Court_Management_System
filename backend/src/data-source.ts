import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CourtType } from './entities/court-type.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,

  entities: [CourtType],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
