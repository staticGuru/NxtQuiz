import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiService } from '@frontend/lib/apiService';
import clsx from 'clsx';
import { SectionTitle } from '@frontend/domain/studyflow/SectionTitle';
import { SectionDescription } from '@frontend/domain/studyflow/SectionDescription';
import { Button } from '@frontend/common/ui';
import img0 from '@frontend/assets/imgs/study-flow/0.png';
import img1 from '@frontend/assets/imgs/study-flow/1.png';
import img2_desktop from '@frontend/assets/imgs/study-flow/2_desktop.png';
import img2_mobile from '@frontend/assets/imgs/study-flow/2_mobile.png';
import img3_desktop from '@frontend/assets/imgs/study-flow/3_desktop.png';
import img3_mobile from '@frontend/assets/imgs/study-flow/3_mobile.png';
import img4_desktop from '@frontend/assets/imgs/study-flow/4_desktop.png';
import img4_mobile from '@frontend/assets/imgs/study-flow/4_mobile.png';
import img5 from '@frontend/assets/imgs/study-flow/5.png';
import { DiamondIcon } from '@frontend/domain/studyflow/icons/DiamondIcon';
import { StudyFlowPageContent } from '@frontend/domain/studyflow/types';
import { SectionImage } from '@frontend/domain/studyflow/SectionImage';

const studyFlowContent: StudyFlowPageContent[] = [
  {
    index: 0,
    title: 'Welcome to SimpleStudy',
    mainIdea: `We studied hard,
			   so you don’t have to.`,
    description: `We built SimpleStudy to help students get the
				  best grades possible. Let’s show you around!`,
    img: img0,
    mixpanelEventName: 'Visited Studyflow Welcome Page',
  },
  {
    index: 1,
    title: 'Gamified revision notes',
    mainIdea: `A+ revision notes 
		       for all your subjects.`,
    description: `Beautiful revision notes and essays for every subject. 
				  Everything you need to succeed, in one place.`,
    descriptionMobile: `Beautiful revision notes and essays for each subject, 
                        all in one place.`,
    img: img1,
    mixpanelEventName: 'Visited Studyflow Notes Page',
  },
  {
    index: 2,
    title: 'Timed questions',
    mainIdea: `Questions by topic. 
			   Timed, and graded.`,
    description: `Practice timed questions, build custom tests, or view past
		 	      papers. We’ve got resources for everything.`,
    descriptionMobile: `Practice questions, build custom tests, or just view 
                        past papers.`,
    img: img2_desktop,
    imgMobile: img2_mobile,
    mixpanelEventName: 'Visited Studyflow Questions Page',
  },
  {
    index: 3,
    title: 'Quizzes by topic',
    mainIdea: `Quizzes, for every topic.`,
    mainIdeaMobile: `Quizzes by topic.
                     Practice anywhere.`,
    description: `We have thousands of questions to help you study for any 
			      topic, anywhere.`,
    img: img3_desktop,
    imgMobile: img3_mobile,
    mixpanelEventName: 'Visited Studyflow Quiz Page',
  },
  {
    index: 4,
    title: 'Complete your profile',
    mainIdea: `Set your targets. 
			   Track your progress.`,
    description: `You can set targets and see your progress every single 
				  day. If it’s two minutes or two hours, we won’t tell your 
				  teachers.`,
    descriptionMobile: `You can set targets and see your progress every single 
                        day.`,
    img: img4_desktop,
    imgMobile: img4_mobile,
    mixpanelEventName: 'Visited Studyflow Progress Page',
  },
  {
    index: 5,
    title: 'Try premium',
    mainIdea: `Try 3-days of
               premium for free`,
    mainIdeaMobile: `Want to try 3-days of 
                     premium for free?`,
    description: `Get FREE access to 100% of our content for 3-days. Join 
				  thousands of students getting better results today.`,
    descriptionMobile: `Get access to 1000’s of premium essays, revision notes, 
                        and more.`,
    img: img5,
    mixpanelEventName: 'Visited Studyflow Premium Page',
  },
];

export function StudyFlow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentContent = studyFlowContent[currentIndex];
  const router = useRouter();

  useEffect(() => {
    ApiService.post('/mixpanel', {
      eventName: currentContent.mixpanelEventName,
    });
  }, [currentContent]);

  function handleContinue() {
    if (currentIndex < studyFlowContent.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handleTryPremium(wantsPremium: boolean) {
    if (wantsPremium) {
      router.push(`/subscription?source=studyflow`);
    } else {
      router.push(`/onboarding`);
    }
  }

  return (
    <div className="flex h-screen w-full justify-center p-5">
      <div
        className={clsx(
          'flex h-full w-full flex-col md:max-w-[1080px] md:flex-row-reverse',
          'items-center justify-center gap-10 md:justify-around xl:gap-20',
          { 'overflow-x-visible': currentIndex === 2 },
        )}
      >
        <SectionImage
          currentContent={currentContent}
          currentIndex={currentIndex}
        />
        <main className="flex max-w-[400px] flex-col items-center gap-3 pt-2 md:items-start md:pt-0 xl:max-w-[570px]">
          <SectionTitle title={currentContent.title} />
          <SectionDescription currentContent={currentContent} />
          {currentIndex !== studyFlowContent.length - 1 ? (
            <Button className="mt-5 w-full" onClick={handleContinue}>
              Continue
            </Button>
          ) : (
            <>
              <Button
                className="mt-5 w-full"
                onClick={() => handleTryPremium(true)}
              >
                <DiamondIcon /> Try premium for free
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleTryPremium(false)}
              >
                Continue with basic
              </Button>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
