export enum entity {
  track = 'track',
  artist = 'artist',
  user = 'user',
  album = 'album',
}

export type loggerInfoProps = {
  date: string;
  url: string;
  method: string;
  queryParams: string;
  body: string;
  statusCode: number;
};
