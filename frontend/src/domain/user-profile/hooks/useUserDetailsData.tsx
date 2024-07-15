import { useState, useEffect } from 'react';

export interface UserDetails {
  userId: number;
  userPlanTypeId: number;
}

export const useUserDetailsData = (): UserDetails | null => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
      return null;
    };

    const cookieData = getCookie('ss_data');
    if (cookieData) {
      try {
        const decodedData = decodeURIComponent(cookieData);
        const parsedData = JSON.parse(decodedData);
        setUserDetails({
          userId: parsedData.u,
          userPlanTypeId: parsedData.p,
        });
      } catch (e) {
        console.error('Failed to parse cookie data:', e);
      }
    }
  }, []);

  return userDetails;
};
