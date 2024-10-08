import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { AtTable, AtTableIns, AtTableProps, AtTableColumnsType } from '.'
import { useAtTable } from '../../../hooks/useTable'
import { Button } from 'antd'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AtTable> = {
  title: 'Atoms/Table',
  component: AtTable,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AtTable<any>> = (args: AtTableProps) => {
  const formIns = React.useRef<AtTableIns>(null)
  const { tableProps, reload, filterValues } = useAtTable({
    filterDefaultValues: {
      state: ['London']
    }
  })
  const columns: AtTableColumnsType = [
    {
      title: 'State',
      dataIndex: 'state',
      filteredValue: filterValues?.state,
      filters: [
        {
          text: 'London',
          value: 'London'
        },
        {
          text: 'New York',
          value: 'New York'
        }
      ]
    }
  ]

  return (
    <>
      <AtTable {...args} columns={columns} ref={formIns} {...tableProps}></AtTable>
      <Button onClick={() => reload()}>重置</Button>
    </>
  )
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
