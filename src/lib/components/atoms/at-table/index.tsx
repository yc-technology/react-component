import { Table } from '@douyinfe/semi-ui'
import { ColumnProps, Data, TableProps } from '@douyinfe/semi-ui/lib/es/table'
import { forwardRef, ReactElement, Ref, useImperativeHandle } from 'react'

export type AtColumnProps<T extends Record<string, any> = Data> = ColumnProps<T>
export type AtTableRef<T extends Record<string, any> = Data> = {
  columns?: AtColumnProps<T>[]
}

function AtTableComp<T extends Record<string, any> = Data>(
  props: TableProps<T>,
  ref: Ref<AtTableRef<T>>
) {
  useImperativeHandle(ref, () => ({ columns: props.columns }), [ref])
  return <Table<T> {...props} />
}

export const AtTable = forwardRef(AtTableComp) as <T extends Record<string, any> = Data>(
  p: TableProps<T> & { ref?: Ref<AtTableRef<T>> }
) => ReactElement
