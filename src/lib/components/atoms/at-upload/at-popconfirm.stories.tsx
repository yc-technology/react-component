import { Meta, StoryFn } from '@storybook/react'
import React, { useEffect, useRef } from 'react'
import { AtUpload, AtUploadIns, AtUploadProps } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtUpload> = {
  title: 'Atoms/Upload',
  component: AtUpload,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    draggable: { type: 'boolean' }
  }
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtUpload> = (args: AtUploadProps) => {
  const inputRef = useRef<AtUploadIns>(null)
  useEffect(() => {
    console.log('inputElement.current', inputRef.current)
  }, [])
  return (
    <div>
      <AtUpload ref={inputRef} {...args}>
        <button>Click me</button>
      </AtUpload>
      <button onClick={() => inputRef.current?.click()}>手动触发</button>
      <button onClick={() => console.info(inputRef.current?.getFileList())}>显示 fileList</button>
    </div>
  )
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  draggable: false
}
