import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class rootMigration1676015957047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(getUserTable());
    await queryRunner.createTable(getArtistTable());
    await queryRunner.createTable(getAlbumTable());
    await queryRunner.createTable(getTrackTable());
    await queryRunner.createTable(getFavoriteAlbumTable());
    await queryRunner.createTable(getFavoriteTrackTable());
    await queryRunner.createTable(getFavoriteArtistTable());
    await queryRunner.createForeignKey(
      'track',
      new TableForeignKey({
        columnNames: ['albumId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'album',
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      'track',
      new TableForeignKey({
        columnNames: ['artistId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'artist',
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      'album',
      new TableForeignKey({
        columnNames: ['artistId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'artist',
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'favoriteAlbum',
      new TableForeignKey({
        columnNames: ['albumId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'album',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'favoriteTrack',
      new TableForeignKey({
        columnNames: ['trackId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'track',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'favoriteArtist',
      new TableForeignKey({
        columnNames: ['artistId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'artist',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableArtist = await queryRunner.getTable('artist');
    await queryRunner.dropForeignKeys(tableArtist, tableArtist.foreignKeys);

    const tableAlbum = await queryRunner.getTable('album');
    await queryRunner.dropForeignKeys(tableAlbum, tableArtist.foreignKeys);

    const tableTrack = await queryRunner.getTable('track');
    await queryRunner.dropForeignKeys(tableTrack, tableArtist.foreignKeys);

    const favoriteTrack = await queryRunner.getTable('favoriteTrack');
    await queryRunner.dropForeignKeys(favoriteTrack, favoriteTrack.foreignKeys);

    const favoriteArtist = await queryRunner.getTable('favoriteArtist');
    await queryRunner.dropForeignKeys(
      favoriteArtist,
      favoriteArtist.foreignKeys,
    );

    const favoriteAlbum = await queryRunner.getTable('favoriteAlbum');
    await queryRunner.dropForeignKeys(favoriteAlbum, favoriteAlbum.foreignKeys);

    await queryRunner.dropTable('user');
    await queryRunner.dropTable('artist');
    await queryRunner.dropTable('album');
    await queryRunner.dropTable('track');
    await queryRunner.dropTable('favoriteAlbum');
    await queryRunner.dropTable('favoriteTrack');
    await queryRunner.dropTable('favoriteArtist');
  }
}

const getUserTable = () =>
  new Table({
    name: 'user',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
      },
      {
        name: 'login',
        type: 'character varying',
      },
      {
        name: 'password',
        type: 'character varying',
      },
      {
        name: 'version',
        type: 'integer',
      },
      {
        name: 'createdAt',
        type: 'bigint',
      },
      {
        name: 'updatedAt',
        type: 'bigint',
      },
    ],
  });

const getArtistTable = () =>
  new Table({
    name: 'artist',
    columns: [
      {
        name: 'id',
        type: 'uuid DEFAULT uuid_generate_v4()',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'name',
        type: 'character varying',
        isNullable: false,
      },
      {
        name: 'grammy',
        type: 'boolean',
        isNullable: false,
      },
    ],
  });

const getAlbumTable = () =>
  new Table({
    name: 'album',
    columns: [
      {
        name: 'id',
        type: 'uuid DEFAULT uuid_generate_v4()',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'name',
        type: 'character varying',
        isNullable: false,
      },
      {
        name: 'year',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'artistId',
        type: 'uuid',
        isNullable: true,
      },
    ],
  });

const getTrackTable = () =>
  new Table({
    name: 'track',
    columns: [
      {
        name: 'id',
        type: 'uuid DEFAULT uuid_generate_v4()',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'name',
        type: 'character varying',
        isNullable: false,
      },
      {
        name: 'artistId',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'albumId',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'duration',
        type: 'int',
        isNullable: false,
      },
    ],
  });

const getFavoriteAlbumTable = () =>
  new Table({
    name: 'favoriteAlbum',
    columns: [
      {
        name: 'id',
        type: 'uuid DEFAULT uuid_generate_v4()',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'albumId',
        type: 'uuid',
        isNullable: true,
      },
    ],
  });

const getFavoriteArtistTable = () =>
  new Table({
    name: 'favoriteArtist',
    columns: [
      {
        name: 'id',
        type: 'uuid DEFAULT uuid_generate_v4()',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'artistId',
        type: 'uuid',
        isNullable: true,
      },
    ],
  });

const getFavoriteTrackTable = () =>
  new Table({
    name: 'favoriteTrack',
    columns: [
      {
        name: 'id',
        type: 'uuid DEFAULT uuid_generate_v4()',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'trackId',
        type: 'uuid',
        isNullable: true,
      },
    ],
  });
