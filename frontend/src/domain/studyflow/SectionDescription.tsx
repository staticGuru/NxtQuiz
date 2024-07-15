import { useBreakpoint } from '@frontend/common/hooks/useBreakpoint';
import { StudyFlowPageContent } from '@frontend/domain/studyflow/types';

export const SectionDescription = ({
  currentContent,
}: {
  currentContent: StudyFlowPageContent;
}) => {
  const { isBelowMd } = useBreakpoint('md');

  const mainIdea =
    isBelowMd && currentContent.mainIdeaMobile
      ? currentContent.mainIdeaMobile
      : currentContent.mainIdea;

  const description =
    isBelowMd && currentContent.descriptionMobile
      ? currentContent.descriptionMobile
      : currentContent.description;

  return (
    <div className="flex flex-col gap-4 text-center md:text-left">
      <h2 className="whitespace-pre-line text-3xl font-semibold text-custom-black md:text-[35px]/[45px] xl:text-[57px]/[72px]">
        {mainIdea}
      </h2>
      <h3 className="text-lg text-secondary-gray">{description}</h3>
    </div>
  );
};
