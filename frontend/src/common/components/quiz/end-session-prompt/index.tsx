import { useRouter } from 'next/navigation';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import rob_experimenting from '@frontend/assets/imgs/rob_experimenting.png';

import { Button, Prompt } from '@frontend/common/ui';

type PromptContentProps = {
  goto?: string;
};

// Component for the prompt bottom buttons
const PromptContent = ({ goto }: PromptContentProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (!goto) {
      router.back();
    } else {
      router.push(goto);
    }
  };

  return (
    <div className="mt-6">
      <Prompt.Close asChild>
        <Button
          variant="primary"
          textSize="small"
          className="h-12 w-full text-base font-bold"
        >
          Keep on going
        </Button>
      </Prompt.Close>
      <Prompt.Action asChild>
        <Button
          variant="ghost"
          size="small"
          textSize="small"
          paddingSize="small"
          className="mt-2 w-full font-extrabold text-[#EF6F5E]"
          onClick={handleClick}
        >
          End session
        </Button>
      </Prompt.Action>
    </div>
  );
};

type EndSessionPromptProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  goto?: string;
};

const EndSessionPrompt: React.FC<PropsWithChildren<EndSessionPromptProps>> = ({
  children,
  open,
  setOpen,
  goto,
}) => {
  return (
    <Prompt.Root
      open={open}
      setOpen={setOpen}
      headerImage={rob_experimenting}
      title="Wait, don't go!"
      description="Your progress will be lost if you quit now"
      dialogContent={<PromptContent goto={goto} />}
      lowBottomPadding
    >
      {children}
    </Prompt.Root>
  );
};

export default EndSessionPrompt;
