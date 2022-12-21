import { LocalStorageKey } from '@enums/local-storage';
import { ILocationDectectionResponse } from '@interfaces/api/location-detector';
import { isBrowser } from '@utils/common';
import { get } from '@services/http-client';
import { RAPID_CLIENT_TOKEN, RAPI_HOST, RAPI_URL } from '@constants/config';
import { LocationDetectorError } from '@enums/location-detector';

export const detectLocationFromIP =
  (): Promise<ILocationDectectionResponse> => {
    return new Promise((resolve, reject) => {
      if (!isBrowser()) {
        reject(LocationDetectorError.NOT_BROWSER);
      }
      try {
        const locationJson = localStorage.getItem(
          LocalStorageKey.USER_LOCATION
        );
        const userLocation: ILocationDectectionResponse = locationJson
          ? JSON.parse(locationJson)
          : {};
        if (userLocation && userLocation.ip) {
          resolve(userLocation);
        } else {
          get<ILocationDectectionResponse>(RAPI_URL, {
            headers: {
              'x-rapidapi-host': RAPI_HOST,
              'x-rapidapi-key': RAPID_CLIENT_TOKEN,
            },
            externalResource: true,
          }).then((res: ILocationDectectionResponse) => {
            if (res && res.ip) {
              localStorage.setItem(
                LocalStorageKey.USER_LOCATION,
                JSON.stringify(res)
              );
              resolve(res);
            } else {
              reject(LocationDetectorError.API_ERROR);
            }
          });
        }
      } catch (_: unknown) {
        reject(LocationDetectorError.UNKNOWN);
      }
    });
  };
