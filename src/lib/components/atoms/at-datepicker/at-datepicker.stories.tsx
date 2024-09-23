import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React from 'react'
import { AtDatePickerPanel, AtDatePickerPanelProps } from '.'
import { AtTooltipProvider } from '../at-tooltip'
import moment, { Moment } from 'moment'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtDatePickerPanel> = {
  title: 'Atoms/AtDatePicker',
  component: AtDatePickerPanel,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof AtDatePickerPanel>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtDatePickerPanel> = (args: AtDatePickerPanelProps) => (
  <AtTooltipProvider>
    <AtDatePickerPanel {...args}></AtDatePickerPanel>
  </AtTooltipProvider>
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtDatePickerPanelProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Default = bind({
  range: false,
  defaultValue: moment(),
  // defaultValue: [] as Moment[],
  onValueChange(value) {
    console.log(value)
  }
})
export const Rang = bind({
  range: true,
  // value: [],
  defaultValue: [] as Moment[],
  onValueChange(value) {
    console.log(value)
  }
})

export const Month = bind({
  range: true,
  mode: 'month',
  // value: [],
  defaultValue: [],
  onValueChange(value) {
    console.log(value)
  }
})
