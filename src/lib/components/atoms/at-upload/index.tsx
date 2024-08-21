import { Upload, UploadProps } from 'antd'
import { forwardRef } from 'react'

export type UploadIns = any

export type AtUploadProps<T = any> = UploadProps<T>

function AtUploadComp<T = any>({ ...props }: UploadProps, ref: UploadIns) {
  return <Upload<T> ref={ref} {...props} />
}

export const AtUpload = forwardRef(AtUploadComp) as <T = any>(
  p: UploadProps<T> & { ref?: AtUploadProps }
) => JSX.Element
