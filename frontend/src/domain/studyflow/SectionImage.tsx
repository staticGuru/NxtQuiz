import Image from 'next/image';
import clsx from 'clsx';
import * as React from 'react';
import { StudyFlowPageContent } from '@frontend/domain/studyflow/types';
import { BlobIcon } from '@frontend/domain/studyflow/icons/BlobIcon';
import { useBreakpoint } from '@frontend/common/hooks/useBreakpoint';

export function SectionImage({
  currentContent,
  currentIndex,
}: {
  currentContent: StudyFlowPageContent;
  currentIndex: number;
}) {
  const { isBelowMd, isAboveMd } = useBreakpoint('md');

  const imageData =
    isBelowMd && currentContent.imgMobile
      ? currentContent.imgMobile
      : currentContent.img;

  return (
    <div className="flex min-h-[120px] w-full max-w-[400px] justify-center">
      <Image
        key={imageData.src}
        src={imageData}
        alt={''}
        priority={true}
        className={clsx(
          'z-10 object-cover object-top',
          { 'max-h-[270px] md:overflow-visible': currentIndex === 0 },
          { 'md:max-w-[315px]': currentIndex === 1 },
          {
            'mr-[-40%] min-w-[250px] max-w-[750px] xl:max-w-[1028px]':
              [2, 3, 4].includes(currentIndex) && isAboveMd,
          },
        )}
      />
      {currentIndex === 1 && isAboveMd && <BlobIcon />}
    </div>
  );
}
