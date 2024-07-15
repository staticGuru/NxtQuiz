import Image, { StaticImageData } from 'next/image';

import { CheckWithCircleIcon } from '@frontend/common/icons';

export type InfoItemProps = {
  title: string;
  icon: StaticImageData;
};

export const InfoItem = ({ title, icon }: InfoItemProps) => (
  <li className="flex items-center justify-between gap-2 px-5 py-[18px]">
    <div className="flex w-full items-center gap-5">
      <Image src={icon} alt="" width={30} height={30} />
      <span className="font-medium">{title}</span>
    </div>
    <CheckWithCircleIcon className="h-5 w-5 text-success-green" />
  </li>
);
