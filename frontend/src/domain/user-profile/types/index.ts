import { SelectAsyncOption } from '@frontend/common/types/form-types';

export interface FormValues {
  name: string;
  email: string;
  country?: SelectAsyncOption;
  exam?: SelectAsyncOption;
  submit?: SelectAsyncOption;
}
