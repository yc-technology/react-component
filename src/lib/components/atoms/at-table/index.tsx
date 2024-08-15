import { Table } from '@douyinfe/semi-ui'
import { Data } from '@douyinfe/semi-ui/lib/es/table'
import { TableProps, ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import NormalTable from '@douyinfe/semi-ui/lib/es/table/Table'
import { forwardRef, ReactElement, Ref, useRef } from 'react'

export type AtColumnProps<T extends Record<string, any> = Data> = ColumnProps<T>
export type AtTableRef<T extends Record<string, any> = Data> = NormalTable<T>

function AtTableComp<T extends Record<string, any> = Data>(
  props: TableProps<T>,
  ref: Ref<AtTableRef<T>>
) {
  return <Table<T> tableRef={ref} {...props} />
}

export const AtTable = forwardRef(AtTableComp) as <T extends Record<string, any> = Data>(
  p: TableProps<T> & { ref?: Ref<Table<T>> }
) => ReactElement
