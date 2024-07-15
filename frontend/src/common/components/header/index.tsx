import React from 'react';
export function Header() {
  // if it's not home page url, then return empty
  if (typeof window === 'undefined' || window.location.pathname !== '/') {
    return <header></header>;
  }

  return (
    <header className="bg-base-200 flex items-center gap-6 px-4 py-3"> </header>
  );
}
