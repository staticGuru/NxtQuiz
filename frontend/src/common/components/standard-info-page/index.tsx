'use client';

import Link from 'next/link';
import { PropsWithChildren } from 'react';
import Image, { StaticImageData } from 'next/image';

import { Button } from '@frontend/common/ui';
import { InfoItem, InfoItemProps } from './InfoItem';

const Container = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-auto flex min-h-screen max-w-[460px] flex-col justify-center">
      <div className="flex flex-col items-center">{children}</div>
    </main>
  );
};

type HeaderImageProps = {
  src: string | StaticImageData;
  alt?: string;
};

const HeaderImage = ({ src, alt }: HeaderImageProps) => {
  return <Image src={src} alt={alt || ''} className="w-max-[400px]" />;
};

const Title = ({ children }: PropsWithChildren) => {
  return (
    <h1 className="mt-5 px-10 text-center text-2xl font-semibold sm:text-4xl">
      {children}
    </h1>
  );
};

const Description = ({ children }: PropsWithChildren) => {
  return (
    <h2 className="mt-2.5 px-10 text-[#7D889C] sm:text-xl sm:font-semibold">
      {children}
    </h2>
  );
};

type StatsListProps = {
  data: InfoItemProps[];
};

const StatsList = ({ data }: StatsListProps) => {
  return (
    <div className="w-full px-4">
      <ul className="mt-5 w-full divide-y rounded-xl border border-[#EAECF0]">
        {data.map((item) => (
          <InfoItem key={item.title} title={item.title} icon={item.icon} />
        ))}
      </ul>
    </div>
  );
};

type BottomButtonProps = {
  type?: 'button' | 'link';
  href?: string;
  handleClick?: () => void;
};

const BottomButton = ({
  type = 'link',
  href,
  handleClick,
  children,
}: PropsWithChildren<BottomButtonProps>) => {
  if (type === 'button' && handleClick) {
    return (
      <div className="mx-auto mt-5 w-full px-4 py-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:max-w-[460px] sm:py-2.5">
        <Button variant="primary" className="w-full" onClick={handleClick}>
          {children}
        </Button>
      </div>
    );
  }

  if (type === 'link' && href) {
    return (
      <Link
        href={href}
        className="mx-auto mt-5 w-full px-4 py-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:max-w-[460px] sm:py-2.5"
      >
        <Button variant="primary" className="w-full">
          {children}
        </Button>
      </Link>
    );
  }

  return null;
};

export { Container, HeaderImage, Title, Description, StatsList, BottomButton };
