import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from '.';
import { withDesign } from 'storybook-addon-designs';
const meta: Meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [withDesign],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'danger',
          'outline',
          'highlighted',
          'subtle',
        ],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    textSize: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    startIcon: { control: 'text' },
    endIcon: { control: 'text' },
  },
};

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'medium',
  textSize: 'medium',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'medium',
  textSize: 'medium',
  children: 'Secondary Button',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  size: 'medium',
  textSize: 'medium',
  children: 'Danger Button',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  size: 'medium',
  textSize: 'medium',
  children: 'Outline Button',
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  variant: 'highlighted',
  size: 'medium',
  textSize: 'medium',
  children: 'Highlighted Button',
};

export const Subtle = Template.bind({});
Subtle.args = {
  variant: 'subtle',
  size: 'medium',
  textSize: 'medium',
  children: 'Subtle Button',
};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  variant: 'primary',
  size: 'medium',
  textSize: 'medium',
  startIcon: '🚀',
  children: 'Start Icon Button',
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  variant: 'primary',
  size: 'medium',
  textSize: 'medium',
  endIcon: '🔥',
  children: 'End Icon Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  size: 'medium',
  textSize: 'medium',
  disabled: true,
  children: 'Disabled Button',
};

export default meta;
