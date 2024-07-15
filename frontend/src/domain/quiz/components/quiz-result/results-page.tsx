'use client';

import { StandardInfoPage } from '@frontend/common/components';

import rob_running from '@frontend/assets/imgs/rob_running.svg';
import trophy_icon from '@frontend/assets/imgs/trophy_icon.png';
import bullseye_icon from '@frontend/assets/imgs/bullseye_icon.png';

type ResultsPageProps = {
  score: number;
  handleClick?: () => void;
};

const ResultsPage = ({ score }: ResultsPageProps) => {
  return (
    <StandardInfoPage.Container>
      <StandardInfoPage.HeaderImage
        src={rob_running}
        alt="rob running illustration"
      />
      <StandardInfoPage.Title>Quiz Complete</StandardInfoPage.Title>
      <StandardInfoPage.Description>
        Practice everyday to stay on track
      </StandardInfoPage.Description>
      <StandardInfoPage.StatsList
        data={[
          { title: `${score}% questions correct`, icon: trophy_icon },
          { title: `Quiz Completed`, icon: bullseye_icon },
        ]}
      />
    </StandardInfoPage.Container>
  );
};

export { ResultsPage };
