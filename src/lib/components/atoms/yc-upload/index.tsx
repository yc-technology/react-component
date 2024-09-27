'use client'

import React, { InputHTMLAttributes, forwardRef, useImperativeHandle, useRef } from 'react'

interface YcUploadProps<T = object> extends Partial<Omit<InputHTMLAttributes<T>, 'onChange'>> {
  onChange?: (files: File[]) => void
  children?: React.ReactNode
}

export interface UploadRef {
  upload: () => void
  getInputElement: () => HTMLInputElement | null
  node: HTMLInputElement | null
}

/**
 * @author django
 * 上传组件
 */
export const YcUpload = forwardRef<UploadRef, YcUploadProps>(function Upload(props, ref) {
  const { onChange, children, className, ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const onUploadChange = (files: FileList) => {
    const fileList = Array.from(files)
    onChange?.(fileList)
    // @ts-expect-error: 可以赋值
    inputRef.current!.value = null
  }

  //   导出实例
  useImperativeHandle(ref, () => {
    return {
      upload() {
        inputRef.current?.click()
      },
      getInputElement() {
        return inputRef.current
      },
      node: inputRef.current
    }
  }, [])

  return (
    <div className={className}>
      <div className="relative inline-block w-full h-full">
        <div
          className=" absolute w-full h-full  cursor-pointer left-0 top-0"
          onClick={() => inputRef.current?.click()}>
          <input
            ref={inputRef}
            className=" w-0 h-0 opacity-0"
            {...rest}
            type="file"
            accept={props.accept}
            onChange={(e) =>
              onUploadChange((e.target as HTMLInputElement | null)?.files as FileList)
            }></input>
        </div>
        {children}
      </div>
    </div>
  )
})
