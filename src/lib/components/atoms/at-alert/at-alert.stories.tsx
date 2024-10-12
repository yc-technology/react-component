import React from 'react'
import { AtAlert, AtAlertDescription, AtAlertProps, AtAlertTitle } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { RocketIcon, UpdateIcon } from '@radix-ui/react-icons'
import { AtTooltipProvider } from '../at-tooltip'
import { AtButton } from '../at-button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtAlert> = {
  title: 'Atoms/AtAlert',
  component: AtAlert,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: {
        type: 'text',

        options: ['default', 'destructive', 'info', 'success', 'warning']
      }
    }
  }
}
export default meta
type Story = StoryObj<typeof AtAlert>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtAlert> = (args: AtAlertProps) => (
  <AtAlert {...args}>{/* <RocketIcon className="h-4 w-4" /> */}</AtAlert>
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtAlertProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Default = bind({
  title: 'Heads up!',
  description: 'You can add components to your app using the cli.',
  action: ({ close }) => (
    <AtButton variant="outline" size="sm" onClick={() => close()}>
      Button
    </AtButton>
  )
})

export const Destructive = bind({
  variant: 'destructive',
  title: 'Heads up!',
  description: 'You can add components to your app using the cli.',
  action: () => (
    <AtButton variant="outline" size="sm" className="h-6 border-destructive text-destructive">
      Button
    </AtButton>
  )
})
