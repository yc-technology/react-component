import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { AtTooltipProvider } from '../at-tooltip'
import { AtButton } from '../at-button'
import { AtTabs, AtTabsList, AtTabsProps, AtTabsTrigger } from '.'
import { DoubleArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtTabs> = {
  title: 'Atoms/Tabs',
  component: AtTabs,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof AtTabs>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtTabs> = (args: AtTabsProps) => {
  const [open, setOpen] = useState(false)
  return (
    <AtTooltipProvider>
      <AtTabs defaultValue="account" onValueChange={(e) => console.info(e)} {...args}>
        <AtTabsList className="grid w-full grid-cols-2">
          <AtTabsTrigger value="account">Account</AtTabsTrigger>
          <AtTabsTrigger value="password">Password</AtTabsTrigger>
        </AtTabsList>
      </AtTabs>
    </AtTooltipProvider>
  )
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtTabsProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Default = bind({})
