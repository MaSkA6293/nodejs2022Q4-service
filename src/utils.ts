import { validate as uuidValidate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { entity } from './interfaces';

export const isValidId = (id: string) => uuidValidate(id);

export const notFoundError = (
  name: entity,
  code: HttpStatus = HttpStatus.NOT_FOUND,
) => {
  throw new HttpException(`record with id === ${name}Id doesn't exist`, code);
};

export const invalidIdBadRequest = () => {
  throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
};
