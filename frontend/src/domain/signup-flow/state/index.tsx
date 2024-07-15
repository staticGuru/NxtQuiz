import { createContext, Dispatch, SetStateAction } from 'react';

import {
  ATTRIBUTION_ROUTE,
  COUNTRY_ROUTE,
  EXAM_ROUTE,
  SUBJECT_ROUTE,
  YEAR_ROUTE,
} from '../routes';

type InitialSignUpDataType = {
  [COUNTRY_ROUTE]: string;
  [EXAM_ROUTE]: string;
  [SUBJECT_ROUTE]: string[];
  [YEAR_ROUTE]: string;
  [ATTRIBUTION_ROUTE]: string;
};

export const initialSignUpData: InitialSignUpDataType = {
  [COUNTRY_ROUTE]: '',
  [EXAM_ROUTE]: '',
  [SUBJECT_ROUTE]: [],
  [YEAR_ROUTE]: '',
  [ATTRIBUTION_ROUTE]: '',
};

export type SignUpContextType = {
  selectedOptions: typeof initialSignUpData;
  setSelectedOptions: Dispatch<SetStateAction<typeof initialSignUpData>>;
  handleWritingState: () => void;
};

export const SignUpContext = createContext<SignUpContextType>({
  selectedOptions: initialSignUpData,
  setSelectedOptions: () => {},
  handleWritingState: () => {},
});
