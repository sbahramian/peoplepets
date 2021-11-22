import { createLogger, format, transports } from "winston";
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import config from 'config';

const env = config.get('env') as string | 'src/storage/logs';
const logDir = config.get('logDir') as string | '/src/storage/logs';
const logPeriod = config.get('logPeriod') as string | '14d';
const maxLogSize = config.get('maxLogSize') as string | '20m';

const transportAllLog = new winston.transports.DailyRotateFile({
  filename: logDir + '/all/' + '%DATE%.log',
  json: true,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()),
  maxSize: maxLogSize,
  maxFiles: logPeriod
});

const transportInfoLog = new winston.transports.DailyRotateFile({
  filename: logDir + '/info/' + '%DATE%.log',
  level: 'info',
  json: true,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()),
  maxSize: maxLogSize,
  maxFiles: logPeriod
});

const transportErrorLog = new winston.transports.DailyRotateFile({
  filename: logDir + '/error/' + '%DATE%.log',
  level: 'error',
  json: true,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()),
  maxSize: maxLogSize,
  maxFiles: logPeriod
});

const transportDebugLog = new winston.transports.DailyRotateFile({
  filename: logDir + '/debug/' + '%DATE%.log',
  level: 'debug',
  json: true,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()),
  maxSize: maxLogSize,
  maxFiles: logPeriod
});

const transportWarnLog = new winston.transports.DailyRotateFile({
  filename: logDir + '/warn/' + '%DATE%.log',
  level: 'warn',
  json: true,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()),
  maxSize: maxLogSize,
  maxFiles: logPeriod
});

let transportsLogger;

if (env == 'development') {

  transportsLogger = [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`))
    }),
    transportAllLog,
    transportInfoLog,
    transportErrorLog,
    transportDebugLog,
    transportWarnLog
  ];

}

if (env == 'production') {

  transportsLogger = [
    transportAllLog,
    transportInfoLog,
    transportErrorLog,
    transportDebugLog,
    transportWarnLog
  ];

}

const log = createLogger({
  transports: transportsLogger
});

export default log;