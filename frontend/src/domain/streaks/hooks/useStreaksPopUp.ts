import { useCallback } from 'react';

const useStreaksPopUp = (userId) => {
  const getToday = () => new Date().toUTCString().split(' ')[1]; // Get the day in UTC

  const hasSeenStreaksResultsPopUpToday = useCallback(() => {
    const today = getToday();
    let lastVisit: string | null = null;

    // if user agent is android
    if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      lastVisit = sessionStorage.getItem('SeenStreaksResultsPopUpAt' + userId);
    } else {
      lastVisit = localStorage.getItem('SeenStreaksResultsPopUpAt' + userId);
    }

    return lastVisit === today;
  }, [userId]);

  const updateLastSeenResultsStrikePopUp = useCallback(() => {
    const today = getToday();

    // if user agent is android
    if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      sessionStorage.setItem('SeenStreaksResultsPopUpAt' + userId, today);
    } else {
      localStorage.setItem('SeenStreaksResultsPopUpAt' + userId, today);
    }
  }, [userId]);

  return {
    hasSeenStreaksResultsPopUpToday,
    updateLastSeenResultsStrikePopUp,
  };
};

export default useStreaksPopUp;
