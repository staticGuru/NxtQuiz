import React from 'react';
import {
  DrawnArrow,
  Review,
  SmallSuperRob,
  SuperRobBackground,
  SuperRob,
} from '@frontend/common/icons';

// This was made because the page is filled with plenty of SVGs in various positions, I wanted to keep it somewhat organized
export const SVGBundle = () => {
  return (
    <>
      <div className="absolute bottom-0 right-0 hidden w-[18%] 2xl:block">
        <DrawnArrow />
      </div>
      <div className="absolute right-0 top-0 mr-[12%] mt-[30%] hidden w-[22%] 2xl:block">
        <Review />
      </div>
      <div className="absolute right-0 top-0 block md:hidden">
        <SmallSuperRob />
      </div>
      <div className="absolute right-0 top-0 hidden md:block md:w-[38%]">
        <SuperRobBackground />
      </div>
      <div className="absolute right-0 top-0 mr-[8.5%] mt-[2.5%] hidden md:mr-[9%] md:mt-[2.5%] md:block md:w-[25%]">
        <SuperRob />
      </div>
    </>
  );
};
