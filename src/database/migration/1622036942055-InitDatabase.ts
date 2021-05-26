import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1622036942055 implements MigrationInterface {
  name = 'InitDatabase1622036942055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "role" "user_role_enum" NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "first_name" text, "last_name" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}
