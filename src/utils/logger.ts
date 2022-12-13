import dayjs from 'dayjs';
import { LogLevel } from '@enums/log-level';

const selectedLogLevel: LogLevel =
  (process.env.NEXT_PUBLIC_LOG_LEVEL as undefined | LogLevel) ??
  LogLevel.Verbose;

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

const logToLogSystem = (_: Record<string, unknown>): void => {
  // TODO - Implement later
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

  prefix = prefix ? ` [${prefix}]:` : '';

  const message = `[${logLevel.toUpperCase()}] (${timestamp})${prefix} ${msg}`;

  const eventLogItem: Record<string, unknown> = {
    logLevel: logLevel,
    message: msg.toString(),
    timestamp: dayjs().unix(),
    module: prefix,
  };

  // Special case for error since we want to see the stacktrace
  if (logLevel === LogLevel.Error) {
    // eslint-disable-next-line no-console
    console.error(message);
    if ((msg as Error).stack) {
      // eslint-disable-next-line no-console
      console.error((msg as Error).stack);
      eventLogItem.stackTrace = (msg as Error).stack as string;
    }
    logToLogSystem(eventLogItem);
    return;
  }

  // eslint-disable-next-line no-console
  console.log(message);

  logToLogSystem(eventLogItem);
};

export default log;
