import type { Metadata } from 'next';
import { connection } from 'next/server';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './globals.css';

export const metadata: Metadata = {
  title: '@blueprint/with-next',
  description: 'This is a blueprint for a web app with Next.js.',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  await connection();

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className="p-2 font-sans antialiased">
        <NextIntlClientProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
