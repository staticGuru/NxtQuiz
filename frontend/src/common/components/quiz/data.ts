export const ANSWER_STATES = {
  UNSELECTED: 'unselected',
  SELECTED: 'selected',
  RIGHT: 'right',
  WRONG: 'wrong',
} as const;

export const difficultyData = {
  easy: {
    color: 'text-success-green',
    bars: 1,
  },
  regular: {
    color: 'text-warning-yellow',
    bars: 2,
  },
  hard: {
    color: 'text-custom-blue',
    bars: 3,
  },
  difficult: {
    color: 'text-error-red',
    bars: 4,
  },
} as const;
