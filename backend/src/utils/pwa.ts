import { CustomRequest } from '@backend/core/ports/event-tracking-port.interface';

export function isPWA(req: CustomRequest): boolean {
  const userAgent = req.headers['user-agent'] || '';
  const xRequestedWith = req.headers['x-requested-with'] || '';

  const isPwaWebview = userAgent.toUpperCase().includes('PWA');
  const isPwaApp =
    xRequestedWith === 'com.app.simplestudy' ||
    xRequestedWith === 'com.app.simplestudy.ios';

  return isPwaWebview || isPwaApp;
}

export function isIOSPWA(req: CustomRequest): boolean {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  return (
    (userAgent.includes('apple') || userAgent.includes('iphone')) &&
    userAgent.includes('pwa')
  );
}
