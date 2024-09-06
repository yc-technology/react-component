import React from 'react'
import { AtButton, AtButtonProps } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { UpdateIcon } from '@radix-ui/react-icons'
import { AtTooltipProvider } from '../at-tooltip'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtButton> = {
  title: 'Atoms/Button',
  component: AtButton,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: { action: 'clicked' },
    loading: { control: 'boolean' },
    tooltip: { control: 'text' }
  }
}
export default meta
type Story = StoryObj<typeof AtButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtButton> = (args: AtButtonProps) => (
  <AtTooltipProvider>
    <AtButton {...args}> Button</AtButton>
  </AtTooltipProvider>
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtButtonProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Primary = bind({
  variant: 'default',
  size: 'sm',
  onClick: () => alert('clicking primary')
})

export const PrimaryIcon = bind({
  variant: 'default',
  size: 'sm',
  icon: <UpdateIcon />,
  onClick: () => alert('clicking primary')
})

export const Secondary = bind({
  variant: 'secondary',
  size: 'sm',
  onClick: () => alert('clicking secondary')
})

export const Link = bind({
  variant: 'link'
})

export const Destructive = bind({
  variant: 'destructive'
})

export const Icon = bind({
  variant: 'icon',
  icon: <UpdateIcon />
})

export const Disabled = bind({
  disabled: true,
  icon: <UpdateIcon />
})
