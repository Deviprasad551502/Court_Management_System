import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdFunction1769582795019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION court.generate_prefixed_id(prefix TEXT)
      RETURNS TEXT AS $$
      BEGIN
        RETURN prefix || '-' || replace(gen_random_uuid()::text, '-', '');
      END;
      $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS court.generate_prefixed_id(TEXT);
    `);
  }
}
