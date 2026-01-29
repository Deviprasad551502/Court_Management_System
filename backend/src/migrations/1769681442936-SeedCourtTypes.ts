import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCourtTypes1769681442936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO court.court_types (id, name)
      VALUES
        (generate_id('COTP'), 'District Court'),
        (generate_id('COTP'), 'High Court'),
        (generate_id('COTP'), 'Supreme Court')
      ON CONFLICT (name) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM court.court_types
      WHERE name IN ('District Court', 'High Court', 'Supreme Court');
    `);
  }
}
