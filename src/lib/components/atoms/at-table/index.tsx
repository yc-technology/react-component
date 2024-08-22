import { Table, TableColumnsType, TableProps } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { forwardRef, ReactElement, Ref, useImperativeHandle } from 'react'

export type AtTableColumnsType<T = AnyObject> = TableColumnsType<T>
export type AtTableIns<T = AnyObject> = {
  columns?: AtTableColumnsType<T>
}
export type AtTableProps<T = AnyObject> = TableProps<T>

function AtTableComp<T = AnyObject>(props: AtTableProps<T>, ref: Ref<AtTableIns<T>>) {
  useImperativeHandle(ref, () => ({ columns: props.columns }), [ref])
  return <Table<T> {...props} />
}

export const AtTable = forwardRef(AtTableComp) as <T = AnyObject>(
  p: TableProps<T> & { ref?: Ref<AtTableIns<T>> }
) => ReactElement
