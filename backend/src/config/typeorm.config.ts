import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'courtdb',
  schema: process.env.DB_SCHEMA ?? 'court',

  autoLoadEntities: true,
  synchronize: false,

  migrationsRun: false,
  migrations: ['dist/migrations/*.js'],
};
