import 'winston-daily-rotate-file';
import { format } from 'winston';
import * as fs from 'fs';
const winston = require('winston');

const logDirectory = process.env.LOG_DIR || 'logs';
const logLevel = 'info';

// Create log directory if it does not exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const getWinstonTransports = (
    field: string = 'transaction',
    logFileHoldingDays: string = '7d',
    errorFileHoldingDays: string = '14d',
) => {
  return [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: 'info',
    }),

    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp(), format.json()),
      maxFiles: logFileHoldingDays,
      level: logLevel,
      dirname: logDirectory,
      datePattern: 'YYYY-MM-DD',
      filename: `%DATE%-${field}-debug.log`,
    }),
  ];
};

const winstonTransports = getWinstonTransports('transaction');

const logger = winston.createLogger({
  transports: winstonTransports,
});

logger.stream = {
  write (message: string, encoding: any) {
    logger.info(message);
  },
};

export default logger;
