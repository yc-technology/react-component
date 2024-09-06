import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { YcForm, YcFormField, YcFormProps } from '.'
import { YcInput } from '../yc-input'
import { z } from '@yc-tech/shared'
import { useYcForm } from '../../../hooks/useForm'
import { AtButton } from '../at-button'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YcForm> = {
  title: 'Atoms/YcForm',
  component: YcForm,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: { action: 'clicked' }
  }
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof YcForm> = (args: YcFormProps<any>) => {
  const schema = z.object({
    email: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .email('Please enter a valid email address.')
  })

  const form = useYcForm(schema, {
    mode: 'onBlur',
    delayError: 300,
    defaultValues: { email: null }
  })
  return (
    <>
      <YcForm {...args} form={form}>
        <YcFormField label="Email" name="email">
          <YcInput />
        </YcFormField>
      </YcForm>

      <AtButton onClick={() => form.clearErrors()}>Clear error</AtButton>
    </>
  )
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
