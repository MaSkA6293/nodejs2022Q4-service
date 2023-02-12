import { MigrationInterface, QueryRunner } from 'typeorm';

export class root1676015957047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(userTable);
    await queryRunner.query(artistTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "artist"`);
  }
}

const userTable = `CREATE TABLE "user"
            (
              "id"      uuid                 NOT NULL uuid_generate_v4() PRIMARY KEY,
              "login"      character varying NOT NULL,
              "password"   character varying NOT NULL, 
              "version"    integer           NOT NULL, 
              "createdAt"  bigint            NOT NULL, 
              "updatedAt"  bigint            NOT NULL,
             )`;

const artistTable = `CREATE TABLE "artist"
            (
              "id"         uuid              NOT NULL uuid_generate_v4() PRIMARY KEY,
              "name"       character varying NOT NULL,
              "grammy"     boolean           NOT NULL,
            )`;
