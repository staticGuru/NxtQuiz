import { StaticImageData } from 'next/image';

export type StudyFlowPageContent = {
  index: number;
  title: string;
  mainIdea: string;
  mainIdeaMobile?: string;
  description: string;
  descriptionMobile?: string;
  img: StaticImageData;
  imgMobile?: StaticImageData;
  mixpanelEventName: string;
};
