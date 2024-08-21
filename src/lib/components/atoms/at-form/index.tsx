import { Form, FormInstance, FormProps } from 'antd'
export type AtFormProps<T extends Record<string, any> = any> = FormProps<T>
export type AtFormInstance<T extends object = any> = FormInstance<T>

export const AtForm = Form

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
