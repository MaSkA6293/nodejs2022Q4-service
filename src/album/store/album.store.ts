import { Injectable } from '@nestjs/common';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumStore } from '../interfaces/album-storage.interface';

Injectable();
export class InMemoryAlbumStore implements AlbumStore {
  private Albums: AlbumEntity[];

  constructor() {
    this.Albums = [];
  }
  findOne = (id: string) => this.Albums.find((Album) => Album.id === id);

  findAll = () => this.Albums;

  create = (Album: AlbumEntity) => {
    this.Albums = [...this.Albums, Album];
    return Album;
  };

  update = (id: string, update: AlbumEntity): AlbumEntity => {
    this.Albums = this.Albums.map((item) => {
      if (item.id === update.id) return update;
      return item;
    });
    return update;
  };

  remove = (id: string): undefined => {
    this.Albums = this.Albums.filter((item) => item.id !== id);
    return;
  };
}
