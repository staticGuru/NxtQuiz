import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, BoxProps } from '.';
import { withDesign } from 'storybook-addon-designs';

const meta: Meta = {
  title: 'Components/Box',
  component: Box,
  decorators: [withDesign],
  argTypes: {
    xs: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    },
    sm: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    },
    md: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    },
    lg: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    },
    xl: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    },
    className: { control: 'text' },
  },
};

const Template: StoryFn<BoxProps> = (args) => <Box {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'This is a Box component',
  xs: 12,
};

export const ResponsiveBox = Template.bind({});
ResponsiveBox.args = {
  children: 'Responsive Box',
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
  xl: 2,
};

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  children: 'Box with custom className',
  className: 'bg-gray-200 p-4',
  xs: 12,
};

export default meta;
