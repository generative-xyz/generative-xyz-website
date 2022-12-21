import dayjs from 'dayjs';
import { LogLevel } from '@enums/log-level';
import { APP_LOG_LEVEL } from '@constants/config';
import DatadogService from '@services/datadog';
import { LogItem } from '@interfaces/log';

const selectedLogLevel: LogLevel =
  (APP_LOG_LEVEL as undefined | LogLevel) ?? LogLevel.Verbose;

const logLevelSufficient = (
  logLevel: LogLevel,
  allowedLogLevel: LogLevel
): boolean => {
  // Mapping LogLevel to number
  const LOGLEVEL_PRIORITY: {
    [key: string]: number;
  } = {
    [LogLevel.Test]: 0,
    [LogLevel.Verbose]: 10,
    [LogLevel.Debug]: 20,
    [LogLevel.Info]: 30,
    [LogLevel.Warning]: 40,
    [LogLevel.Error]: 99,
  };

  const logLevelPriority = LOGLEVEL_PRIORITY[logLevel];
  const allowedLogLevelPriority = LOGLEVEL_PRIORITY[allowedLogLevel];

  return logLevelPriority >= allowedLogLevelPriority;
};

const sendLogToSystem = (logRecord: LogItem): void => {
  const ddInstance = DatadogService.getInstance();
  ddInstance.ddLog(logRecord.message, logRecord);
};

const log = (
  msg: string | Error,
  logLevel: LogLevel,
  prefix?: string
): void => {
  if (!logLevelSufficient(logLevel, selectedLogLevel)) {
    return;
  }

  const timestamp: string = dayjs().format('YYYY-MM-DD, HH:mm:ss.SSS');

  const prettyPrefix = prefix ? ` [${prefix}]:` : '';

  const messagePrefix = `[${logLevel.toUpperCase()}] (${timestamp})${prettyPrefix}`;

  const eventLogItem: LogItem = {
    logLevel,
    message: `${messagePrefix} ${msg}`,
    timestamp: dayjs().unix(),
    module: prefix,
  };

  // Special case for error since we want to see the stacktrace
  if (logLevel === LogLevel.Error) {
    if ((msg as Error).message) {
      eventLogItem.message = `${messagePrefix} ${(msg as Error).message}`;
    }
    // eslint-disable-next-line no-console
    console.error(eventLogItem.message);

    if ((msg as Error).stack) {
      eventLogItem.stackTrace = (msg as Error).stack as string;
      // eslint-disable-next-line no-console
      console.error((msg as Error).stack);
    }

    sendLogToSystem(eventLogItem);
    return;
  }

  // eslint-disable-next-line no-console
  console.log(eventLogItem.message);

  sendLogToSystem(eventLogItem);
};

export default log;
