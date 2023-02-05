import { HttpException, HttpStatus } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

export const checkId = (id: string) => {
  const checkId = uuidValidate(id);

  if (!checkId)
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
};

export const isValidId = (id: string) => uuidValidate(id);
