import React from "react";
import { Formik, FormikValues } from "formik";
import { View } from "react-native";

interface Props {
  initialValues: any;
  onSubmit: (values: any) => Promise<void>;
  validationSchema: any;
  children: React.ReactNode;
  style?: object;
}

const Form: React.FC<Props> = (props: Props) => {
  const { initialValues, onSubmit, validationSchema, children, style } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <View style={style}>{children}</View>
    </Formik>
  );
};

export default Form;
