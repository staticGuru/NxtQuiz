export interface ContentProps {
  selectedOption: number;
  selectedOptionString: string;
  setSelectedOption: (value: number) => void;
  setSelectedOptionString: (value: string) => void;
  handleWritingState: () => void;
  examId?: number;
}

export interface UserSelections {
  educationLevelId?: number;
  universityCourseAreaId?: number;
  productImprovementId?: number;
  productRatingId?: number;
  cancellationReasonId?: number;
}

export interface UserSelectionsString {
  educationLevel?: string;
  universityCourseArea?: string;
  productImprovement?: string;
  productRating?: string;
  cancellationReason?: string;
}

export interface CancellationFlowOptionsWrapperProps {
  children: React.ReactNode;
  onNext: () => void;
  selectedOption: number;
  selectedOptionString: string;
  isNextEnabled: boolean;
  selections?: UserSelections;
  selectionsString?: UserSelectionsString;
}

export interface CancellationFlowPromptWrapperProps {
  children: React.ReactNode;
}

export interface SeeYouAgainPromptProps {
  selections: UserSelections;
}

export interface ScreenProps {
  onNext: () => void;
  onNoThanks?: () => void;
  onContinue?: () => void;
  isContinueButtonDisabled?: boolean;
  selections?: UserSelections;
  selectionsString?: UserSelectionsString;
}

export interface ElephantSpeechBubbleProps {
  message: string;
  state: string;
  riveComponent: React.ComponentType;
}

export interface FreePromptProps {
  onNext: () => void;
  selections: UserSelections;
  selectionsString: UserSelectionsString;
  username: string;
}

export interface KeepSummerAccessProps {
  username: string;
}

export interface KeepSummerAccessSupportProps {
  username: string;
}

export interface DiscountPromptProps {
  onNext: () => void;
  selections: UserSelections;
  selectionsString: UserSelectionsString;
  username: string;
}

export interface OptionsStepProps {
  message: string;
  examId?: number;
  selectedOption: number;
  selectedOptionString?: string;
  setSelectedOptionString?: (value: string) => void;
  setSelectedOption: (value: number) => void;
  ContentComponent: React.ComponentType<{
    selectedOption: number;
    selectedOptionString: string;
    setSelectedOption: (value: number) => void;
    setSelectedOptionString: (value: string) => void;
    handleWritingState: () => void;
    examId?: number;
  }>;
}

export interface FooterProps {
  isContinueButtonDisabled?: boolean;
  onContinue?: () => void;
  selections?: UserSelections;
  selectionsString?: UserSelectionsString;
}

export interface HeaderProps {
  headerEndAddornment: boolean | number | string | React.ReactNode;
}

export interface ScreenBaseProps {
  children?: React.ReactNode; // Content of the component
  style?: React.CSSProperties;
  onContinue?: () => void; // Function to call when the continue button is clicked
  isContinueButtonDisabled?: boolean; // Whether the continue button is disabled
  headerEndAddornment?: boolean | number | string | React.ReactNode;
  customFooter?: React.ReactNode; // Custom footer component
  selections?: UserSelections;
  selectionsString?: UserSelectionsString;
}
