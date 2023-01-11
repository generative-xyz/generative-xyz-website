import {
  APP_ENV,
  DD_APP_ID,
  DD_CLIENT_TOKEN,
  DD_SERVICE,
  DD_SITE,
  ENABLE_DD,
} from '@constants/config';
import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';
import { ApplicationEnvironment } from '@enums/config';

class DatadogService {
  private static instance: DatadogService | null = null;

  static getInstance(): DatadogService {
    if (!DatadogService.instance) {
      DatadogService.instance = new DatadogService();
    }
    return DatadogService.instance;
  }

  init(): void {
    if (APP_ENV === ApplicationEnvironment.PRODUCTION && ENABLE_DD) {
      // Datadog RUM
      datadogRum.init({
        applicationId: DD_APP_ID,
        clientToken: DD_CLIENT_TOKEN,
        site: DD_SITE,
        service: DD_SERVICE,
        env: APP_ENV,
        sampleRate: 100,
        trackResources: true,
        trackLongTasks: true,
        trackInteractions: true,
      });

      // Datadog logs
      datadogLogs.init({
        clientToken: DD_CLIENT_TOKEN,
        site: DD_SITE,
        sampleRate: 100,
      });
    }
  }

  startRUMTracking(): void {
    // Only track on production
    if (APP_ENV === ApplicationEnvironment.PRODUCTION) {
      datadogRum.startSessionReplayRecording();
    }
  }

  stopRUMTracking(): void {
    // Only track on production
    if (APP_ENV === ApplicationEnvironment.PRODUCTION) {
      datadogRum.stopSessionReplayRecording();
    }
  }

  ddLog(message: string, data?: object): void {
    // Only send error logs to DD
    datadogLogs.logger.error(message, data);
  }
}

export default DatadogService;
