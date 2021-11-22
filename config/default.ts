import dotenv from "dotenv";

dotenv.config();

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  dbUri: process.env.DB_URL,
  env: process.env.ENV,
  logDir: process.env.LOG_DIR,
  logPeriod: process.env.LOG_PERIOD,
  maxLogSize: process.env.MAX_LOG_SIZE,
  pageLength: 10
};