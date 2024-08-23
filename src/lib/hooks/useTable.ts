import {
  Data,
  TablePagination,
  TablePaginationProps,
  TableProps
} from '@douyinfe/semi-ui/lib/es/table'
import { keys } from 'lodash-es'
import { useEffect, useState } from 'react'

export type TableFetchApi<
  T extends Record<string, any> = Data,
  FilterValue extends Record<string, any> = Data
> = (data: {
  filterValues?: FilterValue
  pagination?: TablePaginationProps
}) => Promise<{ data: T[]; total: number }>

type UseTableOptions<
  T extends Record<string, any> = Data,
  FilterValue extends Record<string, any> = Data
> = {
  filterDefaultValues?: FilterValue
  pageSize?: number
  page?: number
  setDateSource?: (data: T[]) => void
  fetchApi?: TableFetchApi<T, FilterValue>
} & TableProps<T>

export function useAtTable<
  T extends Record<string, any> = Data,
  FilterValue extends Record<string, any> = Data
>({
  filterDefaultValues,
  fetchApi,
  dataSource: outerDataSource,
  loading: outerLoading,
  pagination: outerPagination = {
    pageSize: 20,
    currentPage: 1
  },
  ...options
}: UseTableOptions<T, FilterValue> = {}) {
  const [filterValues, setFilterValues] = useState<FilterValue | undefined>(filterDefaultValues)
  const [innerDateSource, innerSetDateSource] = useState<T[] | undefined>([])
  const [loading, setLoading] = useState(outerLoading)
  const [innerPagination, setInnerSetPagination] = useState<TablePagination | undefined>(
    outerPagination
  )
  const dataSource = outerDataSource ?? innerDateSource
  const setDateSource = options.setDateSource ?? innerSetDateSource
  const pagination: TablePagination | undefined = dataSource?.length ? innerPagination : false
  const pageSize = typeof pagination === 'boolean' ? 20 : pagination?.pageSize
  const page = typeof pagination === 'boolean' ? 1 : pagination?.currentPage

  const callFetchApi = async (filterValues?: FilterValue, pagination?: TablePaginationProps) => {
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

  const tableProps: TableProps<T> = {
    dataSource,
    pagination,
    loading,
    onChange:
      options.onChange ??
      (async ({ filters, pagination }) => {
        console.log('filters', filters)
        if (filterValues) {
          keys(filterValues).forEach((key) => {
            ;(filterValues as Record<string, any>)[key] = filters?.find(
              (filter) => filter.dataIndex === key
            )?.filteredValue
          })
          setFilterValues({ ...filterValues })
          setInnerSetPagination(pagination)
          await callFetchApi(filterValues, pagination)
        }
      }),
    ...options
  }

  useEffect(() => {
    callFetchApi(
      filterValues,
      typeof innerPagination === 'boolean'
        ? { pageSize: pageSize, currentPage: page }
        : innerPagination
    )
  }, [page, pageSize, JSON.stringify(filterValues)])

  return { dataSource, setDateSource, tableProps, filterValues, setFilterValues }
}
