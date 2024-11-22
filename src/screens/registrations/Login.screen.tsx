import React from "react";
import { View } from "react-native";
import { string, object } from "yup";
import { useDispatch } from "react-redux";

import tw from "../../lib/tailwind";
import { login } from "../../store/auth";
import Text from "../../components/Text";
import Link from "../../components/Link";
import PageWrapper from "./components/PageWrapper";
import { Form, Field, Submit } from "../../components/form";

const ValidationSchema = object().shape({
  password: string().required().min(8).label("Password"),
  email: string().required().min(6).email().label("Email"),
});

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <PageWrapper title="Login" subtitle="Enter your credentials to continue">
      <Form
        validationSchema={ValidationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        // @ts-ignore
        onSubmit={(values) => {
          // @ts-ignore
          dispatch(login(values));
        }}
      >
        <Field
          required
          autoCapitalize="none"
          placeholder="Email"
          name="email"
          // type="email"
          style={tw`mb-5 rounded-lg`}
        />
        <Field
          required
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          name="password"
          // type="password"
          // showPassword
          style={tw`mb-5 rounded-lg`}
        />

        <Submit title="Login" />
      </Form>
      <View style={tw`h-[70px] bg-green-50 bg-opacity-0`}>
        <View style={tw`flex flex-row justify-center`}>
          <Text category="c1" appearance="hint" style={tw`text-black mr-2`}>
            Do not have an account
          </Text>
          <Link text="Create one" to="Login" />
        </View>
      </View>
    </PageWrapper>
  );
};
export default LoginScreen;
