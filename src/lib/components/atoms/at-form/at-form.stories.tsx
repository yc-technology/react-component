import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { AtForm, AtFormInstance, AtFormProps } from '.'
import { Input } from 'antd'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtForm> = {
  title: 'Atoms/Form',
  component: AtForm,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: { action: 'clicked' }
  }
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtForm> = (args: AtFormProps) => {
  const formIns = React.useRef<AtFormInstance>(null)
  return (
    <AtForm {...args} ref={formIns}>
      <AtForm.Item label="User" name="user">
        <Input />
      </AtForm.Item>
    </AtForm>
  )
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  onClick: () => alert('clicking primary')
}
