import { Injectable } from '@nestjs/common';
import { ArtistEntity } from '../entities/artist.entity';
import { ArtistStore } from '../interfaces/artist-storage.interface';

Injectable();
export class InMemoryArtistStore implements ArtistStore {
  private Artists: ArtistEntity[];

  constructor() {
    this.Artists = [];
  }
  findOne = (id: string): ArtistEntity | null =>
    this.Artists.find((Artist) => Artist.id === id);

  findAll = () => this.Artists;

  create = (Artist: ArtistEntity): ArtistEntity => {
    this.Artists = [...this.Artists, Artist];
    return Artist;
  };

  update = (id: string, update: ArtistEntity): ArtistEntity => {
    this.Artists = this.Artists.map((item) => {
      if (item.id === id) return update;
      return item;
    });
    return update;
  };

  remove = (id: string): undefined => {
    this.Artists = this.Artists.filter((item) => item.id !== id);
    return;
  };
}
