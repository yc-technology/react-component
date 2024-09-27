import React from 'react'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { AtDot, AtDotProps } from './index'
import { AtButton } from '../at-button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtDot> = {
  title: 'Atoms/AtDot',
  component: AtDot,
  decorators: [
    (Story) => (
      <div>
        <Story></Story>
      </div>
    )
  ],

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] }
  }
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtDot> = (args: AtDotProps) => <AtDot {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  value: 1
  // children: <AtButton>Button</AtButton>
} as AtDotProps
