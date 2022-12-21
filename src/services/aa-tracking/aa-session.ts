import { v4 as uuidv4 } from 'uuid';
import { isBrowser } from '@utils/common';
import { LocalStorageKey } from '@enums/local-storage';

const SESSION_INACTIVITY_MILISECONDS = 900000; // 15 minutes

class AASession {
  persistData(key: string, value: string): void {
    if (isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  getData(key: string): string {
    if (isBrowser()) {
      localStorage.getItem(key);
    }
    return '';
  }

  generateSessionId(): void {
    const sessionId = uuidv4();
    this.persistData(LocalStorageKey.AA_SESSION_ID, sessionId);
  }

  getSessionId(): string {
    return this.getData(LocalStorageKey.AA_SESSION_ID);
  }

  setLastActive(timestamp: string) {
    this.persistData(LocalStorageKey.AA_LAST_ACTIVE, timestamp);
  }

  getLastActive(): string {
    return this.getData(LocalStorageKey.AA_LAST_ACTIVE);
  }

  update(): void {
    const currentTimestamp = Date.now();
    const lastActive = this.getLastActive();
    const sessionId = this.getSessionId();
    if (lastActive && sessionId) {
      const lastActiveNumber = parseInt(lastActive, 10);
      if (
        currentTimestamp >
        lastActiveNumber + SESSION_INACTIVITY_MILISECONDS
      ) {
        this.generateSessionId();
      }
      this.setLastActive(currentTimestamp.toString());
    } else {
      // Initial page load for new user
      this.generateSessionId();
      this.setLastActive(currentTimestamp.toString());
    }
  }
}

export default AASession;
