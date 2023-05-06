import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CustomExceptionFilter } from './middlewares/exceptionFilter/exceptionFilter.service';
import * as fs from 'fs';
import * as path from 'path';
import {
  getLoggingLevel,
  getUncaughtExceptionLog,
  getUnhandledRejectionLog,
} from './utils';
import { logFileRotation } from './middlewares/logger/utils';
dotenv.config();

const { LOGGING_LEVEL, PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLoggingLevel(LOGGING_LEVEL),
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(PORT);

  process.on('uncaughtException', (err, origin) => {
    const EXCEPTION_LOG_FILE_NAME = 'uncaughtException_log.txt';

    const logFilePath = path.join(
      __dirname + `/../logs/${EXCEPTION_LOG_FILE_NAME}`,
    );

    logFileRotation(logFilePath);
    fs.appendFileSync(logFilePath, getUncaughtExceptionLog(err, origin, false));
    fs.writeSync(process.stderr.fd, getUncaughtExceptionLog(err, origin));
  });

  process.on('unhandledRejection', (reason, promise) => {
    const EXCEPTION_LOG_FILE_NAME = 'unhandledRejection_log.txt';

    const logFilePath = path.join(
      __dirname + `/../logs/${EXCEPTION_LOG_FILE_NAME}`,
    );

    logFileRotation(logFilePath);
    fs.appendFileSync(logFilePath, getUnhandledRejectionLog(reason, promise));
    fs.writeSync(process.stderr.fd, getUnhandledRejectionLog(reason, promise));
  });
}
bootstrap();
