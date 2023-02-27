import { entity } from 'src/interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

export const notFavoriteError = (name: entity): HttpException => {
  throw new HttpException(
    `corresponding ${name} is not favorite`,
    HttpStatus.NOT_FOUND,
  );
};

export const getMessageSuccess = (name: entity): string =>
  `track with id === ${name}Id exists, and was successfully added to favorites`;
