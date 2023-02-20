import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { appendFileSync } from 'fs';
import * as path from 'path';
import { getLog, logFileRotation } from './utils';

const logFilePath = path.join(__dirname + '/../../../logs/log_info.txt');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { url, method } = req;
    const timeStart = new Date();
    const body: string | null = JSON.stringify(req.body);

    res.on('close', () => {
      const log = getLog({
        date: timeStart.toUTCString(),
        url,
        method,
        queryParams: JSON.stringify(req.params),
        body,
        statusCode: res.statusCode,
      });

      logFileRotation(logFilePath);

      appendFileSync(logFilePath, log);
    });

    next();
  }
}
