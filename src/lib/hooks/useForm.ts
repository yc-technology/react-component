import { FieldValues, UseFormProps, UseFormReturn, useForm as useRForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from '@yc-tech/shared'
export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues,
>(
  schema: z.Schema<any, any>,
  props?: UseFormProps<TFieldValues, TContext>,
): UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  return useRForm<z.infer<typeof schema>>({
    ...props,
    resolver: zodResolver(schema),
  }) as UseFormReturn<TFieldValues, TContext, TTransformedValues>
}
