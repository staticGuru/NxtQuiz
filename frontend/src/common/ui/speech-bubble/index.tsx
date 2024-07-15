import React from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';

import { cn } from '@frontend/lib/cn';
import { BubbleArrow } from '@frontend/common/icons';

interface SpeechBubbleProps {
  message: string | string[];
  className?: string;
  arrowOnBottom?: boolean;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  message,
  className,
  arrowOnBottom,
}) => {
  const messages = Array.isArray(message) ? message : [message];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex min-h-[52px] min-w-[30px] max-w-[300px] items-center rounded-xl border-2 border-[#e5e5e5] bg-white p-2.5',
        className,
      )}
    >
      <BubbleArrow
        className={cn(
          'absolute block',
          arrowOnBottom ? 'bottom-[-25px] -rotate-90' : 'left-[-20px]',
        )}
      />
      <ReactTyped
        strings={messages}
        typeSpeed={2}
        showCursor={false}
        className="m-0 font-inter text-[15.14px] font-semibold leading-relaxed text-secondary-blue"
      />
    </motion.div>
  );
};
