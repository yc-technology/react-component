import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React from 'react'
import { AtTooltipProvider } from '../at-tooltip'
import { AtButton } from '../at-button'
import {
  AtDropdownMenuCheckboxes,
  AtDropdownMenuCheckBoxesProps,
  AtDropdownMenuOption,
  AtDropdownMenuRadios,
  AtDropdownMenuRadiosProps
} from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtDropdownMenuCheckboxes> = {
  title: 'Atoms/AtDropdownMen',
  component: AtDropdownMenuCheckboxes,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof AtDropdownMenuCheckboxes>

const options: AtDropdownMenuOption[] = [
  {
    value: '1',
    label: 'Option 1',
    disabled: true
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
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const DropdownMenuCheckBoxes: StoryFn<typeof AtDropdownMenuCheckboxes> = (
  args: AtDropdownMenuCheckBoxesProps
) => (
  <AtTooltipProvider>
    <AtDropdownMenuCheckboxes
      options={options}
      defaultValue={['1']}
      onValueChange={(e) => console.info(e)}
      {...args}>
      <AtButton variant="outline">Open</AtButton>
    </AtDropdownMenuCheckboxes>
  </AtTooltipProvider>
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const DropdownMenuRadios: StoryFn<typeof AtDropdownMenuRadios> = (
  args: AtDropdownMenuRadiosProps
) => (
  <AtTooltipProvider>
    <AtDropdownMenuRadios label="DropdownMenuRadios" options={options} {...args}>
      <AtButton variant="outline">Open</AtButton>
    </AtDropdownMenuRadios>
  </AtTooltipProvider>
)
