import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { appendFileSync } from 'fs';
import * as path from 'path';
import { getLog, logFileRotation } from './utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logFilePath = path.join(__dirname + '/../../../logs/log_info.txt');

  use(req: Request, res: Response, next: NextFunction) {
    const { url, method, body } = req;
    const start = new Date().getTime();
    res.on('close', () => {
      const log = getLog({
        date: new Date().toUTCString(),
        duration: `${(new Date().getTime() - start).toString()} ms`,
        url,
        method,
        queryParams: JSON.stringify(req.params),
        body: JSON.stringify(body),
        statusCode: res.statusCode,
      });

      logFileRotation(this.logFilePath);

      appendFileSync(this.logFilePath, log);
    });

    next();
  }
}
