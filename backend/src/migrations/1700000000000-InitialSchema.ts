import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, Check } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create schema
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS court`);

    // Create function for generating prefixed IDs
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION court.generate_prefixed_id(prefix TEXT)
      RETURNS TEXT AS $$
      DECLARE
        random_part TEXT;
      BEGIN
        random_part := LOWER(SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) FROM 1 FOR 15));
        RETURN prefix || random_part;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Create court_types table
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
            default: "court.generate_prefixed_id('COTP')",
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
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `ALTER TABLE court.court_types ADD CONSTRAINT check_court_type_id CHECK (id LIKE 'COTP%')`,
    );

    // Create court_systems table
    await queryRunner.createTable(
      new Table({
        name: 'court_systems',
        schema: 'court',
        columns: [
          {
            name: 'court_system_id',
            type: 'varchar',
            length: '25',
            isPrimary: true,
            default: "court.generate_prefixed_id('COSY')",
          },
          {
            name: 'court_type_id',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'court_system_name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `ALTER TABLE court.court_systems ADD CONSTRAINT check_court_system_id CHECK (court_system_id LIKE 'COSY%')`,
    );

    await queryRunner.createForeignKey(
      'court.court_systems',
      new TableForeignKey({
        columnNames: ['court_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'court_types',
        referencedSchema: 'court',
        onDelete: 'RESTRICT',
      }),
    );

    // Create courts table
    await queryRunner.createTable(
      new Table({
        name: 'courts',
        schema: 'court',
        columns: [
          {
            name: 'court_id',
            type: 'varchar',
            length: '25',
            isPrimary: true,
            default: "court.generate_prefixed_id('CORT')",
          },
          {
            name: 'court_system_id',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `ALTER TABLE court.courts ADD CONSTRAINT check_court_id CHECK (court_id LIKE 'CORT%')`,
    );

    await queryRunner.createForeignKey(
      'court.courts',
      new TableForeignKey({
        columnNames: ['court_system_id'],
        referencedColumnNames: ['court_system_id'],
        referencedTableName: 'court_systems',
        referencedSchema: 'court',
        onDelete: 'RESTRICT',
      }),
    );

    // Create states table
    await queryRunner.createTable(
      new Table({
        name: 'states',
        schema: 'court',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'state_key',
            type: 'varchar',
            length: '10',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'display_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `ALTER TABLE court.states ADD CONSTRAINT check_state_key_upper CHECK (state_key = UPPER(state_key))`,
    );

    // Create locations table
    await queryRunner.createTable(
      new Table({
        name: 'locations',
        schema: 'court',
        columns: [
          {
            name: 'court_location_id',
            type: 'varchar',
            length: '25',
            isPrimary: true,
            default: "court.generate_prefixed_id('COLO')",
          },
          {
            name: 'state_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'street_address_1',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'street_address_2',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `ALTER TABLE court.locations ADD CONSTRAINT check_court_location_id CHECK (court_location_id LIKE 'COLO%')`,
    );

    await queryRunner.createForeignKey(
      'court.locations',
      new TableForeignKey({
        columnNames: ['state_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'states',
        referencedSchema: 'court',
        onDelete: 'RESTRICT',
      }),
    );

    // Create court_location_map table
    await queryRunner.createTable(
      new Table({
        name: 'court_location_map',
        schema: 'court',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'court_id',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'court_location_id',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'court.court_location_map',
      new TableIndex({
        name: 'unique_court_location',
        columnNames: ['court_id', 'court_location_id'],
        isUnique: true,
      }),
    );

    await queryRunner.createForeignKey(
      'court.court_location_map',
      new TableForeignKey({
        columnNames: ['court_id'],
        referencedColumnNames: ['court_id'],
        referencedTableName: 'courts',
        referencedSchema: 'court',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'court.court_location_map',
      new TableForeignKey({
        columnNames: ['court_location_id'],
        referencedColumnNames: ['court_location_id'],
        referencedTableName: 'locations',
        referencedSchema: 'court',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('court.court_location_map', true);
    await queryRunner.dropTable('court.locations', true);
    await queryRunner.dropTable('court.states', true);
    await queryRunner.dropTable('court.courts', true);
    await queryRunner.dropTable('court.court_systems', true);
    await queryRunner.dropTable('court.court_types', true);
    await queryRunner.query(`DROP FUNCTION IF EXISTS court.generate_prefixed_id(TEXT)`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS court CASCADE`);
  }
}
