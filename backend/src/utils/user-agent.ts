export function getDeviceType(userAgent: string): string {
  const tabletKeywords = ['tablet', 'ipad', 'kindle'];
  const mobileKeywords = [
    'mobile',
    'android',
    'iphone',
    'opera mini',
    'blackberry',
    'windows phone',
  ];

  if (new RegExp(tabletKeywords.join('|'), 'i').test(userAgent)) {
    return 'Tablet';
  } else if (new RegExp(mobileKeywords.join('|'), 'i').test(userAgent)) {
    return 'Mobile';
  } else {
    return 'Desktop';
  }
}

export function getBrowserName(userAgent: string): string {
  let browser = 'Unknown';

  if (/Edge/i.test(userAgent)) {
    browser = 'Microsoft Edge';
  } else if (/MSIE/i.test(userAgent) || /Trident/i.test(userAgent)) {
    browser = 'Internet Explorer';
  } else if (/Firefox/i.test(userAgent)) {
    browser = 'Mozilla Firefox';
  } else if (/Chrome/i.test(userAgent)) {
    browser = 'Google Chrome';
  } else if (/Safari/i.test(userAgent)) {
    browser = 'Apple Safari';
  } else if (/Opera|OPR/i.test(userAgent)) {
    browser = 'Opera';
  }

  return browser;
}

export function getOsName(userAgent: string): string {
  let os = 'Unknown';

  if (/Windows/i.test(userAgent)) {
    os = 'Windows';
  } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
    os = 'Mac OS X';
  } else if (/Linux/i.test(userAgent)) {
    os = 'Linux';
  } else if (/Android/i.test(userAgent)) {
    os = 'Android';
  } else if (/iOS/i.test(userAgent)) {
    os = 'iOS';
  }

  return os;
}
