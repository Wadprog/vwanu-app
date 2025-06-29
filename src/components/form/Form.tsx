import React from 'react'
import { Formik, FormikValues, FormikHelpers } from 'formik'
import { View, StyleProp, ViewStyle } from 'react-native'
import { AnyObjectSchema, InferType } from 'yup'

interface FormProps<S extends AnyObjectSchema> {
  validationSchema: S
  initialValues: InferType<S>
  onSubmit: (
    values: InferType<S>,
    helpers: FormikHelpers<InferType<S>>
  ) => Promise<void> | void
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

// Use a generic function component instead of React.FC so we can pass <T extends FormikValues>
function Form<S extends AnyObjectSchema>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  style,
}: FormProps<S>) {
  return (
    <Formik<InferType<S>>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <View style={style}>{children}</View>}
    </Formik>
  )
}

export default Form
