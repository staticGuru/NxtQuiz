import React from 'react';
import { ElephantSpeechBubble } from '@frontend/domain/cancellation-flow/components/elephant-speech-bubble';
import { useRiveAnimation } from '@frontend/common/components/rive-animation';
import { OptionsStepProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';

// This component is used to display the options step
export const OptionsStep: React.FC<OptionsStepProps> = (
  props: OptionsStepProps,
) => {
  const {
    message,
    examId,
    selectedOption,
    selectedOptionString,
    setSelectedOption,
    setSelectedOptionString,
    ContentComponent,
  } = props;
  const [riveAnimationState, setRiveAnimationState] =
    React.useState('State Machine 1');

  // Destructure the RiveComponent and handleWritingState from the custom hook
  const { RiveComponent, handleWritingState } = useRiveAnimation({
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/backend/uploads/animations/elephant`,
    stateMachines: 'State Machine 1',
  });

  return (
    <>
      <ElephantSpeechBubble
        message={message}
        state={riveAnimationState}
        riveComponent={RiveComponent}
      />
      <ContentComponent
        selectedOption={selectedOption}
        selectedOptionString={selectedOptionString || ''}
        setSelectedOption={setSelectedOption}
        setSelectedOptionString={setSelectedOptionString || (() => {})}
        handleWritingState={handleWritingState}
        examId={examId}
      />
    </>
  );
};
