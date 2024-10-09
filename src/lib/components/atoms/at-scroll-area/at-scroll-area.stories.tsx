import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React, { useRef } from 'react'
import { AtScrollArea, AtScrollAreaProps } from '.'
import { AtTooltipProvider } from '../at-tooltip'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtScrollArea> = {
  title: 'Atoms/AtScrollArea',
  component: AtScrollArea,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof AtScrollArea>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtScrollArea> = (args: AtScrollAreaProps) => {
  return (
    <AtTooltipProvider>
      <div className="flex flex-col h-[500px]">
        <AtScrollArea {...args} className="flex flex-1">
          {Array.from({ length: 100 }, (_, i) => (
            <div
              key={i}
              className="h-16 w-full bg-primary-foreground flex items-center justify-center">
              {i}
            </div>
          ))}
        </AtScrollArea>
      </div>
    </AtTooltipProvider>
  )
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtScrollAreaProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Default = bind({})
