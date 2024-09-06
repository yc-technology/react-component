import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React from 'react'
import { AtTooltipProvider } from '../at-tooltip'
import { AtButton } from '../at-button'
import { AtSelect, AtSelectProps, AtSelectOption } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtSelect> = {
  title: 'Atoms/Select',
  component: AtSelect,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof AtSelect>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtSelect> = (args: AtSelectProps) => (
  <AtTooltipProvider>
    <AtSelect {...args} />
  </AtTooltipProvider>
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtSelectProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

const options: AtSelectOption[] = [
  {
    value: '1',
    label: 'Option 1'
  },
  {
    value: '2',
    label: 'Option 2'
  },
  {
    value: '3',
    label: 'Option 3'
  }
]

export const Default = bind({
  options,
  valueProps: {
    placeholder: 'Select an option'
  }
})
