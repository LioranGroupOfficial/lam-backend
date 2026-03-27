export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
};

export const RATE_LIMIT = {
  DEFAULT: {
    TTL: TIME.MINUTE,
    LIMIT: 100,
  },
  AUTH: {
    TTL: TIME.MINUTE,
    LIMIT: 5,
  },
  HEAVY: {
    TTL: TIME.MINUTE,
    LIMIT: 30,
  },
};