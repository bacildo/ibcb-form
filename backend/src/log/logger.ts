import winston from 'winston';
import path from 'path';

const logFilePath = path.join(__dirname, 'log', 'error.log')

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename:logFilePath, level: 'error' }),
  ],
});

export default logger;
