import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIdFunction1769668681429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE SEQUENCE IF NOT EXISTS global_id_seq;

      CREATE OR REPLACE FUNCTION generate_id(prefix TEXT)
      RETURNS TEXT AS $$
      BEGIN
        RETURN prefix || LPAD(nextval('global_id_seq')::TEXT, 6, '0');
      END;
      $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS generate_id(TEXT);
      DROP SEQUENCE IF EXISTS global_id_seq;
    `);
  }
}
