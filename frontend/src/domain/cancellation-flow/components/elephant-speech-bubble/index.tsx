import { SpeechBubble } from '@frontend/common/ui/speech-bubble';
import React from 'react';
import { ElephantSpeechBubbleProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';

// This component is used to display the elephant speech bubble
export const ElephantSpeechBubble: React.FC<ElephantSpeechBubbleProps> = (
  props: ElephantSpeechBubbleProps,
) => {
  const { message, riveComponent: RiveComponent } = props;
  return (
    <div className="mx-auto flex w-full max-w-[1013px] flex-row items-center justify-start gap-[8px] p-4 max-md:p-0 sm:p-0">
      <div className="elephant-speech-bubble max-md:h-[100px] max-md:w-[100px]">
        <RiveComponent />
      </div>
      <SpeechBubble message={message} />
    </div>
  );
};
