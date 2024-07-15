import React, { memo } from 'react';
import { SpeechBubble } from '@frontend/common/ui/speech-bubble';

interface ElephantSpeechBubbleProps {
  message: string[];
  riveComponent: React.ComponentType;
}

/**
 * ElephantSpeechBubble Component
 *
 * Displays an animated elephant with a speech bubble.
 *
 * Props:
 * - message: The message to display inside the speech bubble.
 */
export const ElephantSpeechBubble: React.FC<ElephantSpeechBubbleProps> = memo(
  ({ message, riveComponent: RiveComponent }) => {
    return (
      <div className="mx-auto flex h-[100px] w-full max-w-6xl flex-row items-center justify-start md:h-[134px]">
        <div className="h-[100px] w-[100px] md:h-[134px] md:w-[142px]">
          <RiveComponent />
        </div>
        <SpeechBubble message={message} />
      </div>
    );
  },
);

ElephantSpeechBubble.displayName = 'ElephantSpeechBubble';
