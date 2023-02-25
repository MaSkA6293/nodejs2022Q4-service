import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { appendFileSync } from 'fs';
import * as path from 'path';
import { getLog, logFileRotation } from '../logger/utils';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  private logFilePath = path.join(__dirname + '/../../../logs/log_errors.txt');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const { url, method, body, params } = ctx.getRequest<Request>();

    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { message } = exception.getResponse() as { message: string };

    const errorMessage =
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Internal Server Error'
        : message;

    const log = getLog({
      date: new Date().toUTCString(),
      url,
      method,
      queryParams: JSON.stringify(params),
      body: JSON.stringify(body),
      statusCode,
      errorMessage,
    });

    logFileRotation(this.logFilePath);

    appendFileSync(this.logFilePath, log);

    response.status(statusCode).json({
      statusCode,
      path: url,
      message: errorMessage,
    });
  }
}
