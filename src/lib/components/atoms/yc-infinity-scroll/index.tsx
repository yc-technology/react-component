'use client'

import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { FetchItemFn, PageQueryResp } from '../../../hooks/usePaging'
import { usePagingScroll } from '../../../hooks/usePagingScroll'
import { YcSpinner } from '../yc-spinner'
import { clsxm } from '@yc-tech/shared'
import { useUpdateEffect } from 'ahooks'

export interface YcInfinityScrollProps {
  dataSource?: any[]
  setDataSource?: (data: any[]) => void
  threshold?: number
  pageSize?: number
  pageToken?: any
  reverse?: boolean
  immediate?: boolean
  fetchFn?: FetchItemFn
  onFinishChange?: (finished: boolean) => void
  renderItem?: (item: any, index: number) => JSX.Element
  renderLoading?: () => JSX.Element
  renderFinished?: () => JSX.Element
  finishedText?: string
  showEmpty?: boolean
  emptyText?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  showFinished?: boolean
}

export interface YcInfinityScrollRef {
  scrollToBottom: () => void
  reload: () => void
  scrollRef: React.RefObject<HTMLDivElement>
}

function defaultFetchFn(data: { page?: number; pageToken?: any; pageSize: number }) {
  return Promise.resolve({ items: [], total: 0 } as PageQueryResp)
}

function useScrollToBottom() {
  // for auto-scroll
  const scrollRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const scrollToBottom = () => {
    const dom = scrollRef.current
    if (dom) setTimeout(() => (dom.scrollTop = dom.scrollHeight), 1)
  }

  // auto scroll
  // useLayoutEffect(() => {
  //   autoScroll && scrollToBottom()
  // })

  return {
    scrollRef,
    autoScroll,
    setAutoScroll,
    scrollToBottom
  }
}

const YcInfinityScroll = React.forwardRef((props: YcInfinityScrollProps = {}, ref) => {
  // 默认渲染 items
  const { showFinished = true } = props
  const {
    dataSource: initialDataSource,
    setDataSource: initialSetDataSource,
    fetchFn = defaultFetchFn,
    renderItem,
    reverse,
    pageSize,
    pageToken,
    renderLoading,
    renderFinished,
    immediate,
    showEmpty,
    emptyText,
    finishedText
  } = props
  const { scrollRef } = useScrollToBottom()

  const { dataSource, loading, finished, initialed, empty, scrollToBottom, reload } =
    usePagingScroll(fetchFn, {
      dataSource: initialDataSource,
      setDataSource: initialSetDataSource,
      target: scrollRef,
      pageSize,
      pageToken,
      reverse,
      immediate
    })

  useEffect(() => {
    if (props.reverse) scrollToBottom()
  }, [])

  const renderState = () => {
    if (finished && !showFinished) return
    return (
      <div
        className={clsxm(
          'w-full py-[6px]  min-h-[34px]',
          [reverse ? 'top-0' : 'bottom-0'],
          [reverse ? '' : ''],
          { 'border-gray-200': finished }
        )}
        style={props.style}>
        {loading &&
          (renderLoading ? (
            renderLoading()
          ) : (
            <div className="flex justify-center items-center w-full ">
              <YcSpinner className="w-6 h-6" />
            </div>
          ))}
        {finished &&
          showFinished &&
          (renderFinished ? (
            renderFinished()
          ) : (
            <div className="flex justify-center items-center w-full text-neutral-300">
              {finishedText || 'No more data'}
            </div>
          ))}

        {empty && showEmpty && (
          <div className="flex justify-center items-center w-full text-neutral-300">
            {emptyText || 'No data'}
          </div>
        )}
      </div>
    )
  }

  useUpdateEffect(() => {
    props.onFinishChange && props.onFinishChange(finished)
  }, [finished])

  useImperativeHandle(ref, () => {
    return {
      scrollToBottom,
      scrollRef,
      reload
    }
  })

  return (
    <div ref={scrollRef} className={clsxm([props.className, 'overflow-auto'])}>
      {/* <div className={clsxm(['min-h-full', reverse ? 'pt-[32px]' : 'pb-[32px]'])}> */}
      {reverse && renderState()}
      {renderItem && dataSource.map((item, index) => renderItem(item, index))}
      {props.children}
      {!reverse && renderState()}
      {/* </div> */}
    </div>
  )
})

export { YcInfinityScroll }
