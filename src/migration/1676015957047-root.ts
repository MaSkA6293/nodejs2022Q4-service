import { MigrationInterface, QueryRunner } from 'typeorm';

export class root1676015957047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(userTable);
    await queryRunner.query(artistTable);
    await queryRunner.query(albumTable);
    await queryRunner.query(trackTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "track"`);
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

const albumTable = `CREATE TABLE "album"
            (
              "id"         uuid              NOT NULL uuid_generate_v4() PRIMARY KEY,
              "name"       character varying NOT NULL,
              "year"       boolean           NOT NULL,
              "artistId"   uuid  FOREIGN KEY REFERENCES artist ("id")
            )`;

const trackTable = `CREATE TABLE "track"
            (
              "id"         uuid              NOT NULL uuid_generate_v4() PRIMARY KEY,
              "name"       character varying NOT NULL,
              "artistId"   uuid  FOREIGN KEY REFERENCES artist ("id")
              "albumId"    uuid  FOREIGN KEY REFERENCES album  ("id")
              "duration"   integer           NOT NULL,
            )`;
