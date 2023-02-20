import { validate as uuidValidate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { entity } from './interfaces';
import { EOL } from 'os';

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

export const getUncaughtExceptionLog = (err, origin, short = true) => {
  if (short) {
    return `${EOL}Date: ${new Date().toUTCString()},${EOL}Caught exception: ${err},${EOL}Exception origin: ${origin}${EOL}`;
  }
  return `${EOL}Date: ${new Date().toUTCString()},${EOL}Caught exception: ${err},${EOL}Exception origin: ${origin}${EOL}Stack:${EOL}${JSON.stringify(
    err.stack,
  )}${EOL}`;
};

export const getUnhandledRejectionLog = (reason, promise) => {
  return `${EOL}Date: ${new Date().toUTCString()},${EOL}Rejection: ${promise},${EOL}Reason: ${reason}${EOL}`;
};
