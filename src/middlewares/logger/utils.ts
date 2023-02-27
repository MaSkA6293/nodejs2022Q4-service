import { existsSync, statSync, unlinkSync } from 'fs';
import { EOL } from 'os';
import * as dotenv from 'dotenv';
import { loggerInfoProps } from 'src/interfaces';

dotenv.config();

const { FILE_SIZE_ROTATE_KB } = process.env;

export const logFileRotation = (pathToLogFile: string): void => {
  if (!existsSync(pathToLogFile)) return;

  const { size } = statSync(pathToLogFile);

  if (size / 1024 > Number(FILE_SIZE_ROTATE_KB)) unlinkSync(pathToLogFile);
};

export const getLog = (props: loggerInfoProps): string => {
  let output = '';
  for (const property in props) {
    output += `${property} : ${props[property]};${EOL}`;
  }
  return `${output}${EOL}`;
};
