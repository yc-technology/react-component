import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { AtTooltipProvider } from '../at-tooltip'
import { AtButton } from '../at-button'
import { AtSelect, AtSelectProps, AtSelectOption, AtSelectIns } from '.'
import { DoubleArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtSelect> = {
  title: 'Atoms/Select',
  component: AtSelect,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof AtSelect>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtSelect> = (args: AtSelectProps) => {
  const ins = useRef<AtSelectIns>(null)
  const [open, setOpen] = useState(false)
  return (
    <AtTooltipProvider>
      <AtSelect
        open={open}
        onOpenChange={setOpen}
        {...args}
        prefix={
          <div className="px-2 hover:bg-muted rounded-md" onClick={() => setOpen(false)}>
            Add user
          </div>
        }
        ref={ins}
      />
    </AtTooltipProvider>
  )
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: AtSelectProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

const options: AtSelectOption[] = [
  {
    value: '1',
    label: 'Option 1'
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

export const Default = bind({
  options,

  itemHoverSuffix: (
    <AtButton
      variant="outline"
      size="icon"
      stopPropagation
      className="h-[22px] w-[22px]"
      onSelect={(e) => console.log(e)}
      onClick={(e) => console.log(e.stopPropagation())}>
      <TrashIcon className="w-4 h-4 text-destructive" />
    </AtButton>
  ),
  triggerProps: {
    suffixHoverHidden: true,
    suffix: <DoubleArrowLeftIcon className="text-black" />
  },
  valueProps: {
    placeholder: 'Select an option'
  }
})
