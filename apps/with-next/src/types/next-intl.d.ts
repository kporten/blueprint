import type { Locale } from '@/i18n/config';

import type messages from '../../messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    // biome-ignore lint/style/useNamingConvention: augmentation
    Locale: Locale;
    // biome-ignore lint/style/useNamingConvention: augmentation
    Messages: typeof messages;
  }
}
