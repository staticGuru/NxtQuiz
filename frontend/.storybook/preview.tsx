import '../src/styles/globals.css';
import { Preview } from '@storybook/react';
import React from 'react';

// Create a decorator to wrap stories with the custom class
const withSimpleStudyComponent = (Story: any) => (
  <div className="simplestudy-react-component">
    <Story />
  </div>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withSimpleStudyComponent],
};

export default preview;
export const tags = ['autodocs'];
