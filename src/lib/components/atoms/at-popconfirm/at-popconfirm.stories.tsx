import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { AtPopconfirm, AtPopconfirmProps } from '.'
import { sleep } from '@yc-tech/shared'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtPopconfirm> = {
  title: 'Atoms/Popconfirm',
  component: AtPopconfirm,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    autoAsync: { type: 'boolean' },
    title: { control: 'text', defaultValue: 'Are you sure?' }
  }
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtPopconfirm> = (args: AtPopconfirmProps) => {
  const _onConfirm = async () => {
    await sleep(3000)
  }
  return (
    <AtPopconfirm onConfirm={_onConfirm} {...args}>
      <button>Click me</button>
    </AtPopconfirm>
  )
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  autoAsync: true,
  title: 'Are you sure?'
}
