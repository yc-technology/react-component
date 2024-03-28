import RcTable, {
  ColumnType as RcColumnType,
  TableProps as RcTableProps,
  Reference
} from 'rc-table'
// import 'rc-table/assets/index.css'
import './index.less'
import './animation.less'
import React from 'react'
// @ts-expect-error: Unreachable code error
import CSSMotionList from 'rc-animate/lib/CSSMotionList'
import { clsxm } from '@yc-tech/shared'

function toArray(children: React.ReactNode) {
  const ret: any = []
  React.Children.forEach(children, function each(c) {
    ret.push(c)
  })
  return ret
}

type MotionBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

const MotionBody: React.FC<MotionBodyProps> = ({ children, ...props }) => {
  const nodeList = toArray(children)
  // @ts-ignore
  const nodesRef = React.useRef<Record<React.Key, React.ReactElement>>({})
  // Better apply clean up logic to avoid OOM
  const keys: React.Key[] = []
  nodeList.forEach((node: any) => {
    if (!node) return
    const { key } = node
    if (key) {
      nodesRef.current[key] = node
      keys.push(key)
    }
    if (node.props?.isEmpty) {
      nodesRef.current['table-empty'] = node
    }
  })

  return (
    <tbody {...props}>
      <CSSMotionList keys={keys} component={false} motionName="move">
        {({ key, className }: { key: string; className: string }) => {
          const node = nodesRef.current[key]
          return React.cloneElement(node, {
            className: clsxm(node.props?.className, className)
          })
        }}
      </CSSMotionList>

      {!keys.length && nodesRef.current['table-empty']}
    </tbody>
  )
}

type YcTableProps<T = unknown> = RcTableProps<T> & {
  animate?: boolean
  headerBackground?: string
  contentBorderWidth?: string
  contentBorderColor?: string
}

function YcTableEmpty() {
  return (
    <div>
      <div className="text-neutral-400 text-xs mt-2">No data available</div>
    </div>
  )
}

function YcTable<T extends Record<string, any>>(
  { animate, headerBackground, contentBorderColor, contentBorderWidth, ...rest }: YcTableProps<T>,
  ref: React.Ref<Reference>
) {
  return (
    <RcTable<T>
      emptyText={<YcTableEmpty />}
      {...rest}
      components={{ body: { wrapper: animate ? MotionBody : undefined } }}
      style={{
        // @ts-expect-error: Unreachable code error
        '--table-head-background-color': headerBackground,
        '--table-content-border-color': contentBorderColor,
        '--table-content-border-width': contentBorderWidth
      }}
      ref={ref}
    />
  )
}

type YcTableType = typeof YcTable
export default React.forwardRef(YcTable) as YcTableType

type YcColumnType<T> = RcColumnType<T>
export type { YcColumnType }
