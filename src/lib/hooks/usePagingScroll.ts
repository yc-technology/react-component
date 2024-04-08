import { useEffect, useState } from 'react'
import { getClientHeight, getScrollHeight, getScrollTop } from 'ahooks/es/utils/rect'
import { getTargetElement } from 'ahooks/es/utils/domTarget'
import { useDebounceFn, useEventListener, useUpdateEffect } from 'ahooks'
import { omit } from 'lodash-es'
import type { FetchItemFn } from './usePaging'
import { usePaging } from './usePaging'
import { Fn } from '~/types'

interface UsePagingScrollOptions {
  target?: React.RefObject<HTMLElement | Document>
  threshold?: number
  reverse?: boolean
  immediate?: boolean
  pageSize?: number
  pageToken?: any
  dataSource?: any[]
  setDataSource?: Fn<[any[]], void>
}

export function usePagingScroll<T>(fetchFn: FetchItemFn, options: UsePagingScrollOptions = {}) {
  const [ndataSource, nsetDataSource] = useState<T[]>([])
  const {
    target,
    threshold = 100,
    reverse,
    dataSource = ndataSource,
    setDataSource = nsetDataSource,
    pageSize,
    pageToken,
    immediate
  } = options
  const { loading, load, finished, ...rest } = usePaging(
    { dataSource, setDataSource, fetchItemsFn: fetchFn },
    { reverse, pageSize, pageToken }
  )

  const [currentScrollTop, setCurrentScrollTop] = useState(0)

  const loadMore = async () => {
    if (finished || loading) return
    const scrollContainer = target!.current as HTMLElement
    const { scrollTop, scrollHeight } = scrollContainer
    setCurrentScrollTop(scrollTop - scrollHeight)
    await load()
  }

  const scrollMethod = () => {
    let el = getTargetElement(target)
    if (!el) return

    el = el === document ? document.documentElement : el

    const scrollTop = getScrollTop(el)
    const scrollHeight = getScrollHeight(el)
    const clientHeight = getClientHeight(el)

    if (reverse) {
      if (scrollTop <= threshold) loadMore()
    } else {
      if (scrollHeight - scrollTop <= clientHeight + threshold) loadMore()
    }
  }

  const { run } = useDebounceFn(scrollMethod, { wait: 100 })

  useEventListener(
    'scroll',
    () => {
      if (loading || finished) return
      run()
    },
    { target }
  )

  useUpdateEffect(() => {
    if (reverse) {
      const scrollContainer = target!.current as HTMLElement
      const { scrollHeight: newScrollHeight } = scrollContainer
      scrollContainer.scrollTop = currentScrollTop + newScrollHeight
    }
  }, [dataSource])

  const scrollToBottom = () => {
    if (target!.current) {
      const scrollContainer = target!.current as HTMLElement
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
        setCurrentScrollTop(scrollContainer.scrollHeight)
      }, 1)
    }
  }

  // 监听需要监听的数据源变化
  useUpdateEffect(() => {
    run()
  }, [dataSource, finished])

  if (immediate) {
    useEffect(() => {
      run()
    }, [])
  }
  return {
    loading,
    finished,
    dataSource,
    setDataSource,
    scrollToBottom,
    load,
    ...omit(rest, 'dataSource', 'setDataSource')
  }
}
