export interface Fn<T extends Array<any> = any[], R = T> {
  (...arg: T): R
}

export interface Position {
  x: number
  y: number
}

export interface RenderableComponent {
  /**
   * The element that the component should be rendered as
   *
   * @default 'div'
   */
  as?: object | string
}

export type PointerType = 'mouse' | 'touch' | 'pen'
