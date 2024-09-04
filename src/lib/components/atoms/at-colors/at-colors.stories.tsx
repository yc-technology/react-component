import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React from 'react'
import { Colors } from '.'
import { AtTooltipProvider } from '../at-tooltip'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Colors> = {
  title: 'Atoms/Colors',
  component: Colors,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof Colors>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Colors> = () => (
  <AtTooltipProvider>
    <Colors></Colors>
  </AtTooltipProvider>
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = () => {
  const obj: Story = Template.bind({})
  return obj
}

export const Default = bind()
