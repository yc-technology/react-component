import { ConfigProvider, ConfigProviderProps } from 'antd'

export type AtConfigProviderProps = ConfigProviderProps

export function AtConfigProvider({ children, ...props }: AtConfigProviderProps) {
  return <ConfigProvider {...props}>{children}</ConfigProvider>
}
