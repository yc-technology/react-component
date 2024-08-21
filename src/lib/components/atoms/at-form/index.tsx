import { Form, FormInstance, FormProps } from 'antd'
import { forwardRef, Ref } from 'react'
export type AtFormProps<T extends Record<string, any> = any> = FormProps<T>
export type AtFormInstance<T extends object = any> = FormInstance<T>

function AtFormComp<T extends Record<string, any> = any>(
  { ...props }: AtFormProps<T>,
  ref?: Ref<AtFormInstance<T>>
) {
  // @ts-expect-error: ref type is not correct
  return <Form<T> {...props} ref={ref} />
}

export const AtForm = forwardRef(AtFormComp) as <T extends Record<string, any> = any>(
  p: AtFormProps<T> & { ref?: AtFormInstance<T> }
) => JSX.Element

// AtForm.Input = Form.Input
// AtForm.InputNumber = Form.InputNumber
// AtForm.InputGroup = Form.InputGroup

// AtForm.Label = Form.Label

// AtForm.Radio = Form.Radio
// AtForm.RadioGroup = Form.RadioGroup
// AtForm.Rating = Form.Rating

// AtForm.Section = Form.Section
// AtForm.Select = Form.Select
// AtForm.Switch = Form.Switch
// AtForm.Slider = Form.Slider
// AtForm.Slot = Form.Slot

// AtForm.Checkbox = Form.Checkbox
// AtForm.Cascader = Form.Cascader
// AtForm.CheckboxGroup = Form.CheckboxGroup

// AtForm.TextArea = Form.TextArea
// AtForm.TimePicker = Form.TimePicker
// AtForm.TagInput = Form.TagInput
// AtForm.TreeSelect = Form.TreeSelect

// AtForm.DatePicker = Form.DatePicker

// AtForm.AutoComplete = Form.AutoComplete

// AtForm.ErrorMessage = Form.ErrorMessage
// AtForm.Upload = Form.Upload
