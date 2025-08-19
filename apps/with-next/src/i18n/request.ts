import { getRequestConfig } from 'next-intl/server';

import { LOCALES } from './config';

export default getRequestConfig(async () => {
  const locale = LOCALES[0];

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
