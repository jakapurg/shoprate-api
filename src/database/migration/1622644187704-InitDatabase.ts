import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1622644187704 implements MigrationInterface {
  name = 'InitDatabase1622644187704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shop_type" ("id" SERIAL NOT NULL, "name" text NOT NULL, "key" character varying NOT NULL, "image_path" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_68c17d89e2f718b7bed0b81987b" UNIQUE ("key"), CONSTRAINT "PK_f144e0e2d11f7419cb8fe943739" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "role" "user_role_enum" NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "first_name" text, "last_name" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shop" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "image_path" text NOT NULL, "shipping_location" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" integer, "type_id" integer, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shop_rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "comment" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "shop_id" integer, CONSTRAINT "PK_363a0ad130f0be054ffd4f85d2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_d53eaffcd55b2eb3f3bdf8353ee" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_f144e0e2d11f7419cb8fe943739" FOREIGN KEY ("type_id") REFERENCES "shop_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop_rating" ADD CONSTRAINT "FK_fb64d72fae4ea98b59667f930b9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop_rating" ADD CONSTRAINT "FK_3b86b94698b21dd2a766103c664" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shop_rating" DROP CONSTRAINT "FK_3b86b94698b21dd2a766103c664"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop_rating" DROP CONSTRAINT "FK_fb64d72fae4ea98b59667f930b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" DROP CONSTRAINT "FK_f144e0e2d11f7419cb8fe943739"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" DROP CONSTRAINT "FK_d53eaffcd55b2eb3f3bdf8353ee"`,
    );
    await queryRunner.query(`DROP TABLE "shop_rating"`);
    await queryRunner.query(`DROP TABLE "shop"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
    await queryRunner.query(`DROP TABLE "shop_type"`);
  }
}
