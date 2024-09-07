import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React from 'react'
import { MlAlertDialog, MlAlertDialogIns, MlAlertDialogProps } from '.'
import { nextTick, sleep } from '@yc-tech/shared'
import { AtButton } from '../../atoms'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MlAlertDialog> = {
  title: 'Molecules/MlAlertDialog',
  component: MlAlertDialog,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof MlAlertDialog>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof MlAlertDialog> = (args: MlAlertDialogProps) => {
  const [show, setShow] = React.useState(false)
  const dialog = React.useRef<MlAlertDialogIns>(null)
  const onCancel = async () => {
    await sleep(2000)
    console.log('cancel')
  }

  const onCloseAfter = async () => {
    console.log('close')
    setShow(false)
  }

  const onOpen = async () => {
    setShow(true)
    await nextTick()
    dialog.current?.open()
  }
  return (
    <>
      <AtButton onClick={onOpen}>open</AtButton>
      {show && (
        <MlAlertDialog ref={dialog} onCancel={onCancel} onCloseAfter={onCloseAfter} {...args} />
      )}
    </>
  )
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: MlAlertDialogProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Default = bind({})
