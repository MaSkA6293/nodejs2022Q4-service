export enum typeFavoriteEntity {
  artist = 'artists',
  track = 'tracks',
  album = 'albums',
}

export interface FavoriteStore {
  findAll: () => {
    tracks: string[];
    albums: string[];
    artists: string[];
  };
  findOne: (type: typeFavoriteEntity, id: string) => string | null;
  add: (type: typeFavoriteEntity, id: string) => void;
  remove: (type: typeFavoriteEntity, id: string) => void;
}
