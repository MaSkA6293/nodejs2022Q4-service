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
    await queryRunner.createTable(getFavoriteTable());

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
      'album',
      new TableForeignKey({
        columnNames: ['favoritesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'favorite',
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      'artist',
      new TableForeignKey({
        columnNames: ['favoritesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'favorite',
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'track',
      new TableForeignKey({
        columnNames: ['favoritesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'favorite',
        onDelete: 'SET NULL',
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

    const tableFavorite = await queryRunner.getTable('favorite');
    await queryRunner.dropForeignKeys(tableFavorite, tableArtist.foreignKeys);

    await queryRunner.dropTable('user');
    await queryRunner.dropTable('artist');
    await queryRunner.dropTable('album');
    await queryRunner.dropTable('track');
    await queryRunner.dropTable('favorite');
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
      {
        name: 'favoritesId',
        type: 'uuid',
        isNullable: true,
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
      {
        name: 'favoritesId',
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
      {
        name: 'favoritesId',
        type: 'uuid',
        isNullable: true,
      },
    ],
  });

const getFavoriteTable = () =>
  new Table({
    name: 'favorite',
    columns: [
      {
        name: 'id',
        type: 'uuid DEFAULT uuid_generate_v4()',
        isPrimary: true,
        isNullable: false,
      },
    ],
  });
