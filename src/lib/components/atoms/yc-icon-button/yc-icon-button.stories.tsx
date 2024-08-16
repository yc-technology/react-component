import React from 'react'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { YcIconButton, IconButtonProps } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YcIconButton> = {
  title: 'Atoms/IconButton',
  component: YcIconButton,
  decorators: [
    (Story) => (
      <div>
        <Story></Story>
      </div>
    )
  ],

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    icon: { control: 'text' },
    loading: { control: 'boolean' },
    variant: { control: 'select', options: ['PRIMARY', 'SECONDARY', 'TERTIARY'] },
    onClick: { action: 'clicked' }
  }
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof YcIconButton> = (args: IconButtonProps) => <YcIconButton {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  icon: 'mingcute:loading-line',
  variant: 'PRIMARY',
  onClick: () => alert('clicking primary')
}
export const Disabled = Template.bind({})
Disabled.args = {
  icon: 'mingcute:loading-line',
  variant: 'PRIMARY',
  isDisabled: true
}
