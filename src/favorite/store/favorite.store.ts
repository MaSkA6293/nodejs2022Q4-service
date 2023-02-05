import { Injectable } from '@nestjs/common';

import {
  FavoriteStore,
  typeFavoriteEntity,
} from '../interfaces/favorite-storage.interface';

Injectable();
export class InMemoryFavoriteStore implements FavoriteStore {
  private tracks: string[];
  private albums: string[];
  private artists: string[];

  constructor() {
    this.tracks = [];
    this.albums = [];
    this.artists = [];
  }

  findAll = () => {
    return {
      tracks: [...this.tracks],
      albums: [...this.albums],
      artists: [...this.artists],
    };
  };

  findOne = (type: typeFavoriteEntity, id: string): string | null =>
    this[type].find((item: string) => item === id);

  add = (type: typeFavoriteEntity, id: string) => {
    this[type] = [...this[type], id];
  };

  remove = (type: typeFavoriteEntity, id: string) => {
    this[type] = this[type].filter((item: string) => item !== id);
  };
}
