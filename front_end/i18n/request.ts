import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async (params) => {
  // Handle both 'locale' and 'requestLocale' for compatibility
  let locale = await (params as any).locale || await (params as any).requestLocale;
  console.log('getRequestConfig processing locale:', locale);
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    console.log('Invalid locale in request config, falling back to default:', routing.defaultLocale);
    locale = routing.defaultLocale;
  }
 
  console.log('Importing messages for:', locale);
  const messages = (await import(`../messages/${locale}.json`)).default;
  console.log('Messages imported successfully for:', locale);

  return {
    locale,
    messages
  };
});
