import { v4 as uuid } from 'uuid';
import { AA_BASE_URL, AA_CLIENT_TOKEN } from '@constants/config';
import { AA_PAGE_VIEW } from '@constants/tracking';
import { LocalStorageKey } from '@enums/local-storage';
import { LogLevel } from '@enums/log-level';
import {
  IAATrackingConfig,
  ITrackEventPayload,
  ITrackPageViewPayload,
} from '@interfaces/aa-tracking';
import AASession from '@services/aa-tracking/aa-session';
import { post } from '@services/http-client';
import { detectLocationFromIP } from '@services/location-detector';
import { isBrowser } from '@utils/common';
import log from '@utils/logger';

const LOG_PREFIX = 'AATrackingAPICaller';

class APICaller {
  private clientToken: string;
  private debugMode: boolean;
  private session: AASession;

  constructor(config: IAATrackingConfig) {
    this.clientToken = config.clientSecret;
    this.debugMode = config.debugMode;
    this.session = new AASession();
  }

  async trackEvent(payload: ITrackEventPayload): Promise<void> {
    if (!isBrowser()) {
      return;
    }

    const { eventName, eventParams } = payload;
    this.session.update();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventPayload: any = {
      event_name: eventName,
      event_timestamp: Math.floor(Date.now() / 1000),
    };

    const eventData: Record<string, string | Record<string, string | number>> =
      {};
    eventData.session_id = this.session.getSessionId();

    let userId = localStorage.getItem(LocalStorageKey.USER_PSEUDO_ID);
    if (userId === null) {
      userId = '0';
    }
    eventData.user_id = userId;
    eventParams.push({
      key: 'user_id',
      value: userId,
    });

    let userPseudoId = localStorage.getItem(LocalStorageKey.USER_PSEUDO_ID);
    if (!userPseudoId) {
      userPseudoId = uuid();
    }
    eventData.user_pseudo_id = userPseudoId;

    eventData.web_info = { url: location.href };
    eventData.web_info.referrer = document.referrer;
    eventData.web_info.user_agent = navigator.userAgent;
    eventData.web_info.screen_width = window.screen.availWidth;
    eventData.web_info.screen_height = window.screen.availHeight;
    eventData.web_info.browser_width = window.innerWidth;
    eventData.web_info.browser_height = window.innerHeight;

    try {
      const userLocation = await detectLocationFromIP();
      eventParams.push({
        key: 'ip',
        value: userLocation.ip,
      });
      eventParams.push({
        key: 'country_name',
        value: userLocation.country,
      });
      eventParams.push({
        key: 'country_code',
        value: userLocation.country_code,
      });
      eventParams.push({
        key: 'state_name',
        value: userLocation.region,
      });
      eventParams.push({
        key: 'state_code',
        value: userLocation.region,
      });
      eventParams.push({
        key: 'city_name',
        value: userLocation.city,
      });
      eventParams.push({
        key: 'organization',
        value: userLocation.organization,
      });
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
      eventParams.push({
        key: 'error_get_api_ip',
        value: err,
      });
    }

    eventPayload.data = eventData;

    if (this.debugMode) {
      log(JSON.stringify(eventPayload), LogLevel.Debug, LOG_PREFIX);
    }

    try {
      post(`${AA_BASE_URL}/event_tracking`, eventPayload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AA_CLIENT_TOKEN,
        },
      });
    } catch (err: unknown) {
      if (this.debugMode) {
        log(err as Error, LogLevel.Debug, LOG_PREFIX);
      }
    }
  }

  trackPageView({ pageName, query = '', ...props }: ITrackPageViewPayload) {
    if (isBrowser()) {
      return;
    }

    const eventParams = [
      { key: 'page_name', value: pageName },
      { key: 'page_query_params', value: query },
    ];

    let sessionFirstPage = sessionStorage.getItem(
      LocalStorageKey.SESSION_FIRST_PAGE_VIEW
    );

    if (!sessionFirstPage) {
      sessionFirstPage = location.href;
      sessionStorage.setItem(
        LocalStorageKey.SESSION_FIRST_PAGE_VIEW,
        sessionFirstPage
      );
    }

    eventParams.push({ key: 'session_first_page', value: sessionFirstPage });

    this.trackEvent({
      ...props,
      eventName: AA_PAGE_VIEW,
      eventParams,
    } as ITrackEventPayload);
  }
}

export default APICaller;
