import { Upload, UploadProps, UploadFile } from 'antd'
import { forwardRef, Ref, useEffect, useImperativeHandle, useRef } from 'react'
import { YcIcon } from '../yc-icon'

export type AtUploadIns<T = any> = {
  click: () => void
  getFileList: () => UploadFile<T>[]
  nativeElement?: HTMLSpanElement
}

type UploadIns<T = any> = { nativeElement: HTMLSpanElement; fileList: UploadFile<T>[] }
export type AtUploadProps<T = any> = UploadProps<T> & {
  draggable?: boolean
  dragMainText?: string
  dragSubText?: string
  draggerRender?: (fileList: any[]) => React.ReactElement
}

function AtUploadComp<T = any>(
  { draggable, dragMainText, dragSubText, draggerRender, ...props }: AtUploadProps,
  ref: Ref<AtUploadIns>
) {
  const inputElement = useRef<HTMLInputElement>(null)
  const inputRef = useRef<UploadIns>(null)
  useEffect(() => {
    // @ts-expect-error: 可以赋值
    inputElement.current = inputRef.current?.nativeElement.getElementsByTagName('input')?.[0]
  }, [draggable])

  useImperativeHandle(ref, () => ({
    click: () => {
      inputElement.current?.click()
    },
    getFileList: () => inputRef.current?.fileList || []
  }))

  useEffect(() => {
    console.log('inputRef.current?.fileList', inputRef.current?.fileList)
  }, [inputRef.current?.fileList])

  if (draggable) {
    return (
      // @ts-expect-error: 可以赋值
      <Upload.Dragger ref={inputRef} listType="picture" {...props}>
        {draggerRender ? (
          draggerRender(inputRef.current?.fileList || [])
        ) : (
          <>
            <div className="ant-upload-drag-icon flex items-center justify-center">
              <YcIcon icon="mingcute:upload-2-line" className="w-6 h-6" />
            </div>
            <p className="mt-2">{dragMainText ?? 'Click or drag file to this area to upload'}</p>
            <p className="ant-upload-hint">
              {dragSubText ?? 'Support for a single or bulk upload.'}
            </p>
          </>
        )}
      </Upload.Dragger>
    )
  }

  return <Upload<T> ref={inputRef} {...props} />
}

export const AtUpload = forwardRef(AtUploadComp) as <T = any>(
  p: AtUploadProps<T> & { ref?: Ref<AtUploadIns> }
) => React.ReactElement
