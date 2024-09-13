import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React, { useRef } from 'react'
import { AtRadio, AtRadioGroup, AtRadioGroupIns, AtRadioGroupProps } from '.'
import { AtTooltipProvider } from '../at-tooltip'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtRadioGroup> = {
  title: 'Atoms/Radio',
  component: AtRadioGroup,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof AtRadioGroup>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtRadioGroup> = (args: AtRadioGroupProps) => {
  const ins = useRef<AtRadioGroupIns>(null)
  return (
    <AtTooltipProvider>
      <AtRadioGroup ref={ins} {...args} className="flex">
        <AtRadio value="1" label="Radio 1"></AtRadio>
        <AtRadio value="2" label="Radio 2"></AtRadio>
      </AtRadioGroup>
    </AtTooltipProvider>
  )
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtRadioGroupProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Default = bind({})
