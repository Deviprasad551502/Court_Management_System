import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCourtTypes1769682100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO court.court_types (name)
      VALUES
        ('District Court'),
        ('High Court'),
        ('Supreme Court')
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
