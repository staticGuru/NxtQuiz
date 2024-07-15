import { CheckIcon } from '@radix-ui/react-icons';
import { CheckedState, CheckboxIndicator } from '@radix-ui/react-checkbox';
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

import { Button, Checkbox, Prompt } from '@frontend/common/ui';

import { PromptData } from './prompt-data';

const PromptContent = () => {
  const [selectedReportOption, setSelectedReportOption] = useState<string[]>(
    [],
  );

  const handleCheckboxChange = (newState: CheckedState, id: string) => {
    if (newState) {
      setSelectedReportOption(
        selectedReportOption.includes(id)
          ? selectedReportOption
          : [...selectedReportOption, id],
      );
    } else {
      setSelectedReportOption(
        selectedReportOption.filter((selectedId: string) => selectedId !== id),
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2.5 text-secondary-blue">
        {PromptData.map((option) => (
          <div key={option.id} className="flex items-center gap-2.5">
            <Checkbox
              id={option.id}
              className="flex items-center justify-center"
              onCheckedChange={(newState) =>
                handleCheckboxChange(newState, option.id)
              }
            >
              <CheckboxIndicator className="CheckboxIndicator">
                <CheckIcon className="h-6 w-6 text-secondary-blue" />
              </CheckboxIndicator>
            </Checkbox>
            <div className="font-medium">{option.description}</div>
          </div>
        ))}
      </div>

      <Prompt.Action asChild>
        <Button
          variant="primary"
          size="large"
          textSize="small"
          className="mt-6 w-full text-base font-bold"
          onClick={() => {
            alert(selectedReportOption);
          }}
        >
          Submit Report
        </Button>
      </Prompt.Action>
    </>
  );
};

type ReportPromptProps = PropsWithChildren<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>;

/**
 * Report Question Prompt Component
 *
 * Displays a prompt for users to report a question.
 */
const ReportPrompt = ({ children, open, setOpen }: ReportPromptProps) => {
  return (
    <Prompt.Root
      open={open}
      setOpen={setOpen}
      dialogContent={<PromptContent />}
    >
      {children}
    </Prompt.Root>
  );
};

export default ReportPrompt;
