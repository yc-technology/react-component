'use client'

import RcImage, {
  ImagePreviewType as RcImagePreviewType,
  ImageProps as RcImageProps
} from 'rc-image'
import React, { useMemo } from 'react'
import './index.less'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross1Icon,
  RotateCounterClockwiseIcon
} from '@radix-ui/react-icons'
import { YcIcon } from '../yc-icon'

type PreviewGroupProps = typeof RcImage.PreviewGroup

const defaultIcons = {
  rotateLeft: <RotateCounterClockwiseIcon />,
  rotateRight: <RotateCounterClockwiseIcon className=" transition scale-x-[-1]" />,
  zoomIn: <YcIcon icon="mingcute:zoom-in-line" />,
  zoomOut: <YcIcon icon="mingcute:zoom-out-line" />,
  close: <Cross1Icon />,
  left: <ChevronLeftIcon />,
  right: <ChevronRightIcon />,
  flipX: <YcIcon icon="mingcute:rotate-x-line" />,
  flipY: <YcIcon icon="mingcute:rotate-y-line" />
}

const PreviewGroup = ({ children, ...rest }: React.ComponentPropsWithRef<PreviewGroupProps>) => {
  return (
    <RcImage.PreviewGroup icons={defaultIcons} {...rest}>
      {children}
    </RcImage.PreviewGroup>
  )
}

export type ImageProps = RcImageProps
export type ImagePreviewType = RcImagePreviewType

interface CompoundedComponent<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup
}
export const YcImage: CompoundedComponent<ImageProps> = ({ preview, ...rest }) => {
  const previewOptions = useMemo(() => {
    if (typeof preview === 'boolean') {
      if (!preview) return false
      return {
        icons: defaultIcons
      }
    }

    return {
      ...preview,
      icons: defaultIcons
    }
  }, [preview])

  return <RcImage preview={previewOptions} {...rest} />
}

YcImage.PreviewGroup = PreviewGroup

export default YcImage
