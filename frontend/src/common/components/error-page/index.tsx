import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@frontend/common/ui';

import rob_experimenting_full from '@frontend/assets/imgs/rob_experimenting_full.svg';
import { ArrowLeftIcon } from '@frontend/common/icons';

type ErrorPageProps = {
  handleTryAgain: () => void;
  goToUrl?: string;
};

export const ErrorPage = ({
  handleTryAgain,
  goToUrl = '/',
}: ErrorPageProps) => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white font-nunito text-secondary-blue">
      <div className="max-w-[428px] px-5">
        <Image
          src={rob_experimenting_full}
          alt="error-page-image"
          className="px-[14px]"
        />
        <div className="pt-5">
          <h1 className="text-center text-3xl font-bold leading-10">
            Oops, looks like an error.
          </h1>
          <p className="mt-2.5 text-center">
            Sorry about that, there was a problem on our side. Feel free to come
            back another time.
          </p>
          <Button
            variant="primaryGradient"
            className="mt-5 w-full"
            onClick={handleTryAgain}
          >
            Try Again
          </Button>
          <Button
            variant="ghost"
            paddingSize="small"
            className="mt-2 w-full gap-1 font-inter text-base font-semibold text-primary-gray"
            onClick={() => router.push(goToUrl)}
            startIcon={
              <ArrowLeftIcon
                width={12}
                height={12}
                className="h-[10px] w-[10px]"
              />
            }
          >
            I’ll just come back later
          </Button>
        </div>
      </div>
    </div>
  );
};
