import { useCallback } from 'react';
import { StateMachineInput, useRive } from '@rive-app/react-canvas';

interface UseRiveAnimationProps {
  src: string;
  stateMachines: string;
  autoplay?: boolean;
}

export const useRiveAnimation = ({
  src,
  stateMachines,
  autoplay = true,
}: UseRiveAnimationProps) => {
  const { RiveComponent, rive } = useRive({
    src,
    stateMachines,
    autoplay,
  });

  const handleWritingState = useCallback(() => {
    if (rive && rive.stateMachineInputs) {
      const inputs: StateMachineInput[] =
        rive.stateMachineInputs(stateMachines);
      const writingInput = inputs.find((i) => i.name === 'Writing');
      const idleInput = inputs.find((i) => i.name === 'Idle');

      if (writingInput) {
        writingInput.fire();
        // Stop the animation after 2 seconds
        setTimeout(() => {
          idleInput?.fire();
        }, 2000);
      } else {
        console.error("State machine input 'Writing' not found.");
      }
    } else {
      console.error('Rive object or stateMachineInputs not available yet.');
    }
  }, [rive, stateMachines]);

  return { RiveComponent, handleWritingState };
};
