import { Injectable } from '@nestjs/common';
import { TrackEntity } from '../entities/track.entity';
import { TrackStore } from '../interfaces/track-storage.interface';

Injectable();
export class InMemoryTrackStore implements TrackStore {
  private tracks: TrackEntity[];

  constructor() {
    this.tracks = [];
  }
  findOne = (id: string) => this.tracks.find((track) => track.id === id);

  findAll = () => this.tracks;

  create = (track: TrackEntity) => {
    this.tracks = [...this.tracks, track];
    return track;
  };

  update = (id: string, update: TrackEntity): TrackEntity => {
    this.tracks = this.tracks.map((item) => {
      if (item.id === update.id) return update;
      return item;
    });
    return update;
  };

  remove = (id: string) => {
    this.tracks = this.tracks.filter((item) => item.id !== id);
  };

  removeAlbum = (id: string) => {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
        return track;
      }
      return track;
    });
  };
}
