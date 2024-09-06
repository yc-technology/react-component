import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import {
  AtDialog,
  AtDialogContent,
  AtDialogDescription,
  AtDialogFooter,
  AtDialogHeader,
  AtDialogProps,
  AtDialogTitle,
  AtDialogTrigger
} from '.'
import { sleep } from '@yc-tech/shared'
import { AtButton } from '../at-button'
import { AtLabel } from '../at-label'
import { YcInput } from '../yc-input'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtDialog> = {
  title: 'Atoms/AtDialog',
  component: AtDialog,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtDialog> = (args: AtDialogProps) => {
  return (
    <AtDialog {...args}>
      <AtDialogTrigger asChild>
        <AtButton variant="outline">Edit Profile</AtButton>
      </AtDialogTrigger>
      <AtDialogContent className="sm:max-w-[425px]">
        <AtDialogHeader>
          <AtDialogTitle>Edit profile</AtDialogTitle>
          <AtDialogDescription>
            Make changes to your profile here. Click save when you're done.
          </AtDialogDescription>
        </AtDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <AtLabel htmlFor="name" className="text-right">
              Name
            </AtLabel>
            <YcInput id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="flex items-center gap-4">
            <AtLabel htmlFor="username" className="text-right">
              Username
            </AtLabel>
            <YcInput id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <AtDialogFooter>
          <AtButton type="submit">Save changes</AtButton>
        </AtDialogFooter>
      </AtDialogContent>
    </AtDialog>
  )
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  autoAsync: true,
  title: 'Are you sure?'
}
