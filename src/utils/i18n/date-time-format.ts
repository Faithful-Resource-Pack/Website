import { IntlDateTimeFormats } from 'vue-i18n';

/**
 * Default override for date time formats of the application.
 */
const dateTimeFormats: IntlDateTimeFormats = {
  en: {
    short: {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
  },
  fr: {
    short: {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
    long: {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
  },
};

export default dateTimeFormats;
