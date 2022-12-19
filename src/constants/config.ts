/* eslint-disable @typescript-eslint/no-non-null-assertion */

// Global
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV!;
export const APP_LOG_LEVEL = process.env.NEXT_PUBLIC_LOG_LEVEL!;
export const APP_MAX_FILESIZE = process.env.NEXT_PUBLIC_MAX_FILESIZE!;

// Datadog configs
export const DD_APP_ID = process.env.DD_APP_ID!;
export const DD_CLIENT_TOKEN = process.env.DD_CLIENT_TOKEN!;
export const DD_SITE = 'datadoghq.com';
export const DD_SERVICE = process.env.NEXT_PUBLIC_DD_SERVICE!;

/* eslint-enable @typescript-eslint/no-non-null-assertion */
