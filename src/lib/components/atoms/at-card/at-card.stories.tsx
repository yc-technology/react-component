import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React from 'react'
import {
  AtCard,
  AtCardContent,
  AtCardDescription,
  AtCardFooter,
  AtCardHeader,
  AtCardProps,
  AtCardTitle
} from '.'
import { AtTooltipProvider } from '../at-tooltip'
import { AtButton } from '../at-button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtCard> = {
  title: 'Atoms/Card',
  component: AtCard,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: { action: 'clicked' }
  }
}
export default meta
type Story = StoryObj<typeof AtCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtCard> = (args: AtCardProps) => (
  <AtTooltipProvider>
    <AtCard {...args} />
  </AtTooltipProvider>
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtCardProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Default = bind({
  className: 'w-96',
  children: (
    <>
      <AtCardHeader>
        <AtCardTitle>Card Title</AtCardTitle>
        <AtCardDescription>Card Description</AtCardDescription>
      </AtCardHeader>
      <AtCardContent>Card Content</AtCardContent>
      <AtCardFooter className="flex justify-between">
        <AtButton variant="destructive">confirm</AtButton>
        <AtButton>cancel</AtButton>
      </AtCardFooter>
    </>
  )
})
