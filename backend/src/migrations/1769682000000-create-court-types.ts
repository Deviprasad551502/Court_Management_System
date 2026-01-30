import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCourtTypes1769682000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Ensure schema exists
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS court`);

    // 2. Create court_types table
    await queryRunner.createTable(
      new Table({
        name: 'court_types',
        schema: 'court',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '25',
            isPrimary: true,
            default: "generate_id('COTP')",
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // 3. Add ID format check
    await queryRunner.query(`
      ALTER TABLE court.court_types
      ADD CONSTRAINT check_court_type_id
      CHECK (id LIKE 'COTP%')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('court.court_types', true);
  }
}
