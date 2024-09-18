import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React from 'react'
import { AtTooltipProvider } from '../at-tooltip'
import { AtLabel } from '../at-label'
import { AtCheckbox, AtCheckboxGroup, AtCheckboxProps } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtCheckbox> = {
  title: 'Atoms/AtCheckbox',
  component: AtCheckbox,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof AtCheckbox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtCheckbox> = (args: AtCheckboxProps) => (
  <AtTooltipProvider>
    <div>
      <div className="flex items-center space-x-2">
        <AtCheckboxGroup value={[]} onValueChange={(e) => console.log(e)}>
          <AtCheckbox value="1" label="Check Box 1" {...args} />
          <AtCheckbox value="2" label="Check Box 2" {...args} />
        </AtCheckboxGroup>
      </div>
    </div>
  </AtTooltipProvider>
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtCheckboxProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Default = bind({})
