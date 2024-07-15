'use client';

import * as React from 'react';

import {
  ATTRIBUTION_ROUTE,
  COUNTRY_ROUTE,
  EXAM_ROUTE,
  SUBJECT_ROUTE,
  SignUpParams,
  YEAR_ROUTE,
  ACCOUNT_ROUTE,
} from '@frontend/domain/signup-flow/routes';
import {
  CountryPage,
  ExamsPage,
  SubjectsPage,
  YearPage,
  AttributionPage,
  AccountPage,
} from '@frontend/domain/signup-flow/components/pages';

function SignUpFlowPage({ params }: { params: SignUpParams }) {
  switch (params.route) {
    case COUNTRY_ROUTE:
      return <CountryPage />;

    case EXAM_ROUTE:
      return <ExamsPage />;

    case SUBJECT_ROUTE:
      return <SubjectsPage />;

    case YEAR_ROUTE:
      return <YearPage />;

    case ATTRIBUTION_ROUTE:
      return <AttributionPage />;

    case ACCOUNT_ROUTE:
      return <AccountPage />;

    default:
      return null;
  }
}

export default SignUpFlowPage;
