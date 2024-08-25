import { TablePaginationConfig } from 'antd'
import { AtTableProps } from '../components/atoms/at-table'
import { AnyObject } from 'antd/es/_util/type'
import { keys } from 'lodash-es'
import { useEffect, useState } from 'react'

export type TableFetchApi<
  T extends Record<string, any> = AnyObject,
  FilterValue extends Record<string, any> = AnyObject
> = (data: {
  filterValues?: FilterValue
  pagination?: TablePaginationConfig
}) => Promise<{ data: T[]; total: number }>

type UseTableOptions<
  T extends Record<string, any> = AnyObject,
  FilterValue extends Record<string, any> = AnyObject
> = {
  filterDefaultValues?: FilterValue
  setDateSource?: (data: T[]) => void
  fetchApi?: TableFetchApi<T, FilterValue>
} & AtTableProps<T>

export function useAtTable<
  T extends Record<string, any> = AnyObject,
  FilterValue extends Record<string, any> = AnyObject
>({
  filterDefaultValues,
  fetchApi,
  dataSource: outerDataSource,
  loading: outerLoading,
  pagination: outerPagination = {
    pageSize: 20,
    current: 1
  },
  ...options
}: UseTableOptions<T, FilterValue> = {}) {
  const [filterValues, setFilterValues] = useState<FilterValue | undefined>(filterDefaultValues)
  const [innerDateSource, innerSetDateSource] = useState<T[] | undefined>([])
  const [loading, setLoading] = useState(outerLoading)
  const [innerPagination, setInnerSetPagination] = useState<TablePaginationConfig | undefined>(
    typeof outerPagination === 'boolean' ? undefined : outerPagination
  )
  const dataSource = outerDataSource ?? innerDateSource
  const setDateSource = options.setDateSource ?? innerSetDateSource
  const pagination = innerPagination ?? false
  const pageSize = typeof pagination === 'boolean' ? 20 : pagination?.pageSize
  const page = typeof pagination === 'boolean' ? 1 : pagination?.current

  const callFetchApi = async (filterValues?: FilterValue, pagination?: TablePaginationConfig) => {
    try {
      setLoading(true)
      const res = await fetchApi?.({ filterValues: filterValues, pagination })
      if (res) {
        setDateSource(res.data)
        if (res.total)
          setInnerSetPagination(
            typeof pagination === 'boolean'
              ? {
                  pageSize: pageSize,
                  total: res.total
                }
              : {
                  ...pagination,
                  total: res.total
                }
          )
      }

      return res
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const tableProps: AtTableProps<T> = {
    dataSource,
    pagination,
    loading,
    onChange:
      options.onChange ??
      (async (pagination, filters, sorter, extra) => {
        console.log('filters', filters)
        if (filterValues) {
          keys(filterValues).forEach((key) => {
            if (filters[key]) {
              ;(filterValues[key] as Record<string, any>) = filters[key]
            }
          })
          setFilterValues({ ...filterValues })
          setInnerSetPagination(pagination)
          await callFetchApi(filterValues, pagination)
        }
      }),
    ...options
  }

  useEffect(() => {
    callFetchApi(filterValues, innerPagination)
  }, [page, pageSize, JSON.stringify(filterValues)])

  return { dataSource, setDateSource, tableProps, filterValues, setFilterValues }
}
