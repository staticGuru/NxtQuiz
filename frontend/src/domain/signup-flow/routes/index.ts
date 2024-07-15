export const COUNTRY_ROUTE = 'country';
export const EXAM_ROUTE = 'exam';
export const SUBJECT_ROUTE = 'subject';
export const YEAR_ROUTE = 'year';
export const ATTRIBUTION_ROUTE = 'attribution';
export const ACCOUNT_ROUTE = 'account';

export const routesList = [
  COUNTRY_ROUTE,
  EXAM_ROUTE,
  SUBJECT_ROUTE,
  YEAR_ROUTE,
  ATTRIBUTION_ROUTE,
  ACCOUNT_ROUTE,
];

export type SignUpParams = {
  route: (typeof routesList)[number];
};

export const routesData = {
  [COUNTRY_ROUTE]: {
    footerButtonText: 'Select my region',
    chatBubbleMessages: [
      'Hey, welcome to SimpleStudy!',
      'Where are you studying?',
    ],
  },
  [EXAM_ROUTE]: {
    footerButtonText: 'Select my exam',
    chatBubbleMessages: ['Cool!', 'What exam are you taking?'],
  },
  [SUBJECT_ROUTE]: {
    footerButtonText: 'Continue',
    chatBubbleMessages: ['You seem confident!', 'What subjects do you study?'],
  },
  [YEAR_ROUTE]: {
    footerButtonText: 'Select my year',
    chatBubbleMessages: ['Cool!', 'What year are you in?'],
  },
  [ATTRIBUTION_ROUTE]: {
    footerButtonText: 'Continue',
    chatBubbleMessages: ['How did you hear about SimpleStudy?'],
  },
  [ACCOUNT_ROUTE]: {
    footerButtonText: '',
    chatBubbleMessages: [
      'You seem confident!',
      'Now, give me your email or else...',
    ],
  },
};
