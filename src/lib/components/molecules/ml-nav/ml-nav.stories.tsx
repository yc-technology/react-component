import { Meta, StoryFn, StoryObj } from '@storybook/react'
import React from 'react'
import { MlNav, MlNavProps } from '.'
import { AtTooltipProvider } from '../../atoms/at-tooltip'
import { BrowserRouter } from 'react-router-dom'
import { ExitIcon, HomeIcon } from '@radix-ui/react-icons'
import {
  AtResizableHandle,
  AtResizablePanel,
  AtResizablePanelGroup
} from '../../atoms/at-resizable-panel'
import { clsxm } from '@yc-tech/shared'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MlNav> = {
  title: 'Molecules/Nav',
  component: MlNav,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
}
export default meta
type Story = StoryObj<typeof MlNav>

const defaultLayout = [20, 32, 48]
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof MlNav> = (args: MlNavProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <BrowserRouter basename="/">
      <AtTooltipProvider>
        <AtResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`
          }}
          className="h-full items-stretch">
          <AtResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={4}
            collapsible={true}
            minSize={10}
            maxSize={15}
            onCollapse={() => {
              setIsCollapsed(true)
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
            }}
            onResize={() => {
              setIsCollapsed(false)
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
            }}
            className={clsxm(
              'max-w-[300px]',
              isCollapsed && 'min-w-[50px] max-w-[80px] transition-all duration-300 ease-in-out'
            )}>
            <MlNav
              {...args}
              isCollapsed={isCollapsed}
              links={[
                {
                  title: 'Inbox',
                  label: '128',
                  variant: 'default',
                  icon: ({ className }) => <HomeIcon className={className} />
                },
                {
                  title: 'Drafts',
                  label: '9',
                  variant: 'ghost',
                  icon: ({ className }) => <ExitIcon className={className} />
                },
                {
                  title: 'Sent',
                  label: '',
                  variant: 'ghost'
                },
                {
                  title: 'Junk',
                  label: '23',
                  variant: 'ghost'
                },
                {
                  title: 'Trash',
                  label: '',
                  variant: 'ghost'
                },
                {
                  title: 'Archive',
                  label: '',
                  variant: 'ghost'
                }
              ]}></MlNav>
          </AtResizablePanel>
          <AtResizableHandle withHandle />
          <AtResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <div>sdas</div>
          </AtResizablePanel>
        </AtResizablePanelGroup>
      </AtTooltipProvider>
    </BrowserRouter>
  )
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const bind = (args: MlNavProps) => {
  const obj: Story = Template.bind({})
  obj.args = args
  return obj
}

export const Primary = bind({
  isCollapsed: false
})
