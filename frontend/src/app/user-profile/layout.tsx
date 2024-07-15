'use client';

interface EmptyLayoutProps {
  children: React.ReactNode;
}

function EmptyLayout({ children }: EmptyLayoutProps) {
  return <>{children}</>;
}

export default EmptyLayout;
