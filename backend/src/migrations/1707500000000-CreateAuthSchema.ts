import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthSchema1707500000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create auth schema
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS auth`);

    // Create roles table
    await queryRunner.query(`
      CREATE TABLE auth.roles (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE auth.users (
        id BIGSERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);

    // Create user_roles junction table
    await queryRunner.query(`
      CREATE TABLE auth.user_roles (
        user_id BIGINT NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        role_id BIGINT NOT NULL REFERENCES auth.roles(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, role_id)
      )
    `);

    // Create indexes
    await queryRunner.query(`CREATE INDEX idx_users_email ON auth.users(email)`);
    await queryRunner.query(`CREATE INDEX idx_user_roles_user_id ON auth.user_roles(user_id)`);
    await queryRunner.query(`CREATE INDEX idx_user_roles_role_id ON auth.user_roles(role_id)`);

    // Insert default roles
    await queryRunner.query(`
      INSERT INTO auth.roles (name, description) VALUES
        ('admin', 'System administrator with full access'),
        ('user', 'Standard user with basic access')
    `);

    // Create a default admin user (password: Admin@123)
    // Password hash for 'Admin@123' using bcrypt
    await queryRunner.query(`
      INSERT INTO auth.users (email, password_hash, full_name, is_active)
      VALUES ('admin@example.com', '$2b$10$YourHashedPasswordHere', 'System Admin', true)
    `);

    // Assign admin role to default admin user
    await queryRunner.query(`
      INSERT INTO auth.user_roles (user_id, role_id)
      SELECT u.id, r.id
      FROM auth.users u
      CROSS JOIN auth.roles r
      WHERE u.email = 'admin@example.com' AND r.name = 'admin'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS auth.user_roles`);
    await queryRunner.query(`DROP TABLE IF EXISTS auth.users`);
    await queryRunner.query(`DROP TABLE IF EXISTS auth.roles`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS auth CASCADE`);
  }
}
