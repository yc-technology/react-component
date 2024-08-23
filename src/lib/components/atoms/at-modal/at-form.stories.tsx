import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { AtModal, AtModalIns, AtModalProps } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtModal> = {
  title: 'Atoms/Form',
  component: AtModal,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtModal> = (args: AtModalProps) => {
  const ins = React.useRef<AtModalIns>()
  return <AtModal {...args}></AtModal>
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  onClick: () => alert('clicking primary')
}
