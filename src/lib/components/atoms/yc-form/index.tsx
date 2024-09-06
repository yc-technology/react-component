'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { clsxm } from '@yc-tech/shared'
import { isEmpty } from 'lodash-es'
import * as React from 'react'
import {
  Controller,
  ControllerProps,
  FieldError,
  FieldPath,
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
  useFormContext
} from 'react-hook-form'
import YcLabel from '../yc-label'

type YcFormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(YcFormItemContext)

  if (isEmpty(fieldContext)) {
    return {}
  }

  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  } as Partial<{
    invalid: boolean
    isDirty: boolean
    isTouched: boolean
    error?: FieldError | undefined
    id: string
    name: string
    formItemId: string
    formDescriptionId: string
    formMessageId: string
  }>
}

type FormItemContextValue = {
  id: string
}

const YcFormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

const YcFormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    return (
      <YcFormItemContext.Provider value={{ id }}>
        <div ref={ref} className={clsxm('space-y-2', className)} {...props} />
      </YcFormItemContext.Provider>
    )
  }
)
YcFormItem.displayName = 'FormItem'

const YcFormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <YcLabel
      ref={ref}
      className={clsxm(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
YcFormLabel.displayName = 'FormLabel'

const YcFormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
})
YcFormControl.displayName = 'YcFormControl'

const YcFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={clsxm('text-[0.8rem] text-muted-foreground', className)}
      {...props}
    />
  )
})
YcFormDescription.displayName = 'FormDescription'

const YcFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={clsxm('text-[0.8rem] font-medium text-destructive', className)}
      {...props}>
      {body}
    </p>
  )
})
YcFormMessage.displayName = 'FormMessage'

// Form Field

type FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
  ControllerProps<TFieldValues, TName>,
  'render'
> & {
  description?: string
  children: React.ReactNode
  label?: string
  labelClassName?: string
  className?: string
}
const FormFieldContext = React.createContext<YcFormFieldContextValue>({} as YcFormFieldContextValue)

const YcFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  description,
  children,
  label,
  className,
  labelClassName,
  ...props
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={({ field }) => (
          <YcFormItem className={className}>
            {label && <YcFormLabel className={labelClassName}>{label}</YcFormLabel>}
            <YcFormControl>
              <Slot {...field}>{children}</Slot>
            </YcFormControl>
            <YcFormDescription>{description}</YcFormDescription>
            <YcFormMessage />
          </YcFormItem>
        )}
      />
    </FormFieldContext.Provider>
  )
}

// Form ----------------------------------------------------------------------
type YcFormProps<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues
> = {
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
  onValid?: TTransformedValues extends undefined
    ? SubmitHandler<TFieldValues>
    : TTransformedValues extends FieldValues
      ? SubmitHandler<TTransformedValues>
      : never
  onInvalid?: SubmitErrorHandler<TFieldValues>
} & Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'>

const YcForm = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues
>({
  form,
  children,
  className,
  onValid
}: YcFormProps<TFieldValues, TContext, TTransformedValues>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={onValid ? form.handleSubmit(onValid) : undefined}
        className={clsxm(className)}>
        {children}
      </form>
    </FormProvider>
  )
}

export {
  YcForm,
  YcFormControl,
  YcFormDescription,
  YcFormField,
  YcFormItem,
  YcFormLabel,
  YcFormMessage,
  FormProvider as YcFormProvider,
  useFormField
}
