import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { AtDraggableCard, AtDraggableCardProps } from './index'
import { AtButton } from '../at-button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtDraggableCard> = {
  title: 'Atoms/AtDraggableCard',
  component: AtDraggableCard,
  decorators: [
    (Story) => (
      <div>
        <Story></Story>
      </div>
    )
  ],

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtDraggableCard> = (args: AtDraggableCardProps) => (
  <AtDraggableCard {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  title: 'Xero',
  children: <AtButton>Button</AtButton>,
  // description: 'sdas',
  footer: 'footer'
} as AtDraggableCardProps
