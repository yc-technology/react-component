import { ConfigProvider, ConfigProviderProps } from 'antd'

export type YcConfigProviderProps = ConfigProviderProps

export function YcConfigProvider({ children, ...props }: YcConfigProviderProps) {
  return <ConfigProvider {...props}>{children}</ConfigProvider>
}
