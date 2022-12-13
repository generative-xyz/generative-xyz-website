export enum LogLevel {
  /**
   * Used for tests only
   */
  Test = 'test',
  /**
   * Verbose logging.
   * Not recommended for production use.
   */
  Verbose = 'verbose',
  /**
   * Debug logging.
   * Not recommended for production use.
   */
  Debug = 'debug',
  /**
   * Info logging.
   * May be useful for production use for new services.
   */
  Info = 'info',
  /**
   * Warnings and above.
   * Recommended for production use.
   */
  Warning = 'warning',
  /**
   * HIGHest log level.
   *
   * Recommended for production use only if you really
   * want to ignore warnings.
   */
  Error = 'error',
}
