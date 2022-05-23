import { IntlNumberFormats } from 'vue-i18n';

/**
 * Default override for number formats of the application.
 */
const numberFormats: IntlNumberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
    },
  },
  fr: {
    currency: {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
    },
  },
};

export default numberFormats;
