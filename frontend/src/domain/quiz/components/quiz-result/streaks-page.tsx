import { StreaksIcon } from '@frontend/common/icons';
import { StandardInfoPage } from '@frontend/common/components';

import rob_sunbathing from '@frontend/assets/imgs/rob_sunbathing.svg';
type StreaksPageProps = {
  streaks: number;
};
const StreaksPage = ({ streaks }: StreaksPageProps) => {
  return (
    <StandardInfoPage.Container>
      <StandardInfoPage.HeaderImage
        src={rob_sunbathing}
        alt="rob sunbathing illustration"
      />
      <div className="mt-5 flex items-center gap-2.5 text-[#FF5E2A]">
        <span className="font-nunito text-6xl font-bold">{streaks}</span>
        <StreaksIcon />
      </div>
      <StandardInfoPage.Title>You made it look easy</StandardInfoPage.Title>
      <StandardInfoPage.Description>
        Practice everyday to stay on track.
      </StandardInfoPage.Description>
      <StandardInfoPage.BottomButton href={'/account/quiz'}>
        Continue
      </StandardInfoPage.BottomButton>
    </StandardInfoPage.Container>
  );
};

export { StreaksPage };
