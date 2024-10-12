import { useEventListener } from 'ahooks'

export interface PasteOptions {
  onPaste?: (
    e?: ClipboardEvent,
    file?: File | null,
    items?: DataTransferItemList,
    clipboardData?: DataTransfer | null
  ) => void
}

export function usePaste({ onPaste }: PasteOptions = {}) {
  useEventListener('paste', (e) => {
    e.preventDefault()
    const file = e.clipboardData?.items[0].getAsFile()
    onPaste?.(e, file, e.clipboardData?.items, e.clipboardData)
  })
}
