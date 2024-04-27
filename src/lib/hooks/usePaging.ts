import { useEffect, useState } from 'react'
import { useUpdateEffect } from 'ahooks'
import { isUndefined, set } from 'lodash-es'
import { assign } from '@yc-tech/shared'
import { Fn } from '~/types'

export interface PageQueryResp {
  /** Page */
  page?: number
  /** Page Size */
  pageSize?: number
  /** Max Index */
  pageToken?: any
  /** Total */
  total: number
  /** Items */
  items: object[]
  [key: string]: any
}

export interface FetchItemParams {
  page?: number
  pageToken?: any
  pageSize: number
}
export type FetchItemFn = Fn<[FetchItemParams], Promise<PageQueryResp>>
export interface UsePagingOptions {
  page?: number
  pageSize?: number
  pageToken?: any
  itemsKey?: string
  totalKey?: string
  immediate?: boolean
  reverse?: boolean
  [kye: string]: any
}

export function usePaging<T extends any[]>(
  initialData: { fetchItemsFn: FetchItemFn; dataSource: T; setDataSource: Fn<[T], void> },
  initialOptions: UsePagingOptions = {}
) {
  const options = { pageSize: 10, itemsKey: 'items', totalKey: 'total' } as Required<
    NonNullable<UsePagingOptions>
  >
  initialOptions = Object.keys(initialOptions).reduce((acc, key) => {
    if (!isUndefined(initialOptions[key])) acc[key] = initialOptions[key]

    return acc
  }, {} as UsePagingOptions)
  assign(options, initialOptions)
  const [page, setPage] = useState<number | undefined>(options.page)
  const [pageSize, setPageSize] = useState(options.pageSize!)
  const [pageToken, setPageToken] = useState(options.pageToken)
  const [initialed, setInitialed] = useState(false)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [errored, setErrored] = useState<boolean>(false)
  const [empty, setEmpty] = useState(false)
  const dataSource = initialData.dataSource
  const setDataSource = initialData.setDataSource

  const load = async () => {
    setLoading(true)
    try {
      const res = await initialData.fetchItemsFn({ page, pageSize, pageToken })
      setInitialed(true)
      if (!empty && !res.items.length && !dataSource.length) setEmpty(true)
      const remoteItems = res[options.itemsKey!] as T
      const remoteTotal = res[options.totalKey!] as number
      let isFinished = false
      if (options.reverse) remoteItems.reverse()
      if (typeof page === 'number') {
        // 分页模式
        setDataSource([...remoteItems] as T)
      } else {
        // 滚动模式
        isFinished = remoteItems.length < pageSize || !res.pageToken
        if (options.reverse) setDataSource([...remoteItems, ...dataSource] as T)
        else setDataSource([...dataSource, ...remoteItems] as T)
      }

      setPageToken(res.pageToken)
      setFinished(isFinished)
      setTotal(remoteTotal)
    } catch (e) {
      setErrored(true)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const reload = () => {
    setPage(initialOptions.page)
    setPageToken(initialOptions.pageToken!)
    setErrored(false)
    setLoading(false)
    setFinished(false)
    setEmpty(false)
    setDataSource([] as any)
    load()
  }

  useUpdateEffect(() => {
    if (finished || loading || empty) return
    load()
  }, [page, finished, errored, empty])

  useEffect(() => {
    if (options.immediate) load()
  }, [])

  return {
    page,
    pageSize,
    empty,
    setEmpty,
    setPage,
    setPageSize,
    dataSource,
    setDataSource,
    pageToken,
    setPageToken,
    total,
    loading,
    finished,
    load,
    reload
  }
}
