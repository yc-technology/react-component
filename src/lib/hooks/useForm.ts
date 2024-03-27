import { FieldValues, UseFormProps, UseFormReturn, useForm as useRForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodTypeDef } from '@yc-tech/shared'
export function useYcForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues,
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output
>(
  schema: z.Schema<Output, Def, Input>,
  props?: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  return useRForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    resolver: zodResolver(schema)
  })
}
