import React from 'react';
import { View, Text, Image } from 'react-native';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContext } from '@react-navigation/native';

// Core components
import tw from '../lib/tailwind';
import { image } from '../config';
import { Register, getCurrentUser } from '../store/auth';
import { Form, Field, Submit, Switch } from '../components/form';

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(3).label('First Name'),
  lastName: Yup.string().required().min(3).label('Last Name'),
  // eslint-disable-next-line newline-per-chained-call
  email: Yup.string().required().min(6).email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must be match'),
  // termOfUse: Yup.bool().oneOf(
  //   [true],
  //   'You must accept the terms of use and the policy privacy'
  // ),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  // termOfUse: false,
};

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const navigation = React.useContext(NavigationContext);

  const handleSubmit = (values) => {
    const { log } = console;
    log(' registering wi la ');
    dispatch(Register(values));
    // log('values', values)
    navigation.replace('SignUpStep', {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <View style={tw`mx-0 md:mx-0 lg:h-screen`}>
      <View style={tw`grid grid-cols-1 lg:mb:0 lg:grid-cols-2`}>
        <View
          style={[
            tw`hidden lg:inline lg:relative lg:justify-center`,
            {
              backgroundImage: `url(${image.Home_pic})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            },
          ]}
        >
          <LinearGradient
            colors={[tw.color('g-one/[0.78]'), tw.color('g-two/[0.78]')]}
            locations={[0.2, 0.8]}
            style={tw` bg-red-400 bg-gradient-to-tr from-g-one/[0.78] to-g-two/[0.78] h-96 z-0 lg:h-screen bg-red-500`}
          >
            <Image
              source={image.Shape_up}
              alt="_image.Shape_up"
              style={tw`hidden lg:block w-[22%] lg:absolute right-0 z-30 -mt-8 object-fit`}
            />
            <Text style={tw`text-center pt-14 text-base-100 text-2xl py-5`}>
              <Image
                style={tw`mt-10 w-[30%] m-auto`}
                source={image.log}
                alt="image.log_vwanu"
              />
            </Text>
            <Text
              style={tw`text-5xl text-v-yellow-dark font-bold py-10 mt-10 text-center align-middle`}
            >
              Welcome
            </Text>
            <Text
              style={tw`hidden lg:block text-base-100 text-xl -center pb-2 align-middle`}
            >
              Together We are Stronger
            </Text>
          </LinearGradient>
          <Image
            source={image.Shape_up}
            alt="_shape_down"
            style={tw`hidden lg:block w-[23%] lg:absolute left-0 z-30 bottom-0 object-fit rotate-180`}
          />
        </View>

        <View style={tw`inline lg:hidden`}>
          <LinearGradient
            colors={[tw.color('g-one/[0.78]'), tw.color('g-two/[0.78]')]}
            locations={[0.2, 0.8]}
            style={tw`h-96 z-0 lg:h-screen`}
          >
            <Text>Yo</Text>
            <Image
              source={image.Shape_up}
              alt="_image.Shape_up"
              style={tw`hidden lg:block w-[22%] lg:absolute right-0 z-30 -mt-8 object-fit`}
            />
            <View style={tw`pt-14 py-5`}>
              <Image
                style={tw` mt-10 mx-auto`}
                source={image.log}
                alt="image.log_vwanu"
              />
            </View>
            <Text
              style={tw`text-5xl text-v-yellow-dark font-bold py-10 mt-3 text-center`}
            >
              Welcome
            </Text>
            <Text
              style={tw`hidden lg:block text-base-100 text-xl font-semibold text-center pb-2`}
            >
              Together We are Stronger
            </Text>
          </LinearGradient>
          <Image
            source={image.Shape_up}
            alt="_shape_down"
            style={tw`hidden lg:block w-[23%] lg:absolute left-0 z-30 bottom-0 object-fit rotate-180`}
          />
        </View>

        <View
          style={tw`place-items-center bg-white shadow-t-2xl rounded-t-[30px] lg:rounded-none px-4 md:px-8 -mt-28 z-10 md:mx-36 lg:mt-0 lg:mx-0 lg:h-screen pt-5`}
        >
          <View
            style={tw`lg:place-content-center lg:mt-6 lg:mb-3 items-center`}
          >
            <View style={tw`flex flex-row items-center justify-center`}>
              <Text
                style={tw`text-lg text-cs-primary font-semibold md:text-xl`}
              >
                Already have an account ?
              </Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Login')}
                style={tw`rounded-3xl md:px-8 ml-1 text-base-100 bg-cs-primary p-3 flex flex-row items-center justify-center`}
              >
                <Text style={tw`text-lg font-semibold text-white`} to="/login">
                  Sign In
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={tw`hidden lg:block mb-8 lg:mb-4 text-center`}>
            <View
              style={tw`text-blue-600 text-center inline text-md md:text-lg`}
            >
              <Text> Or sign in with </Text>
              <Text> Fac</Text>
              {/* <BsFacebook style={tw`text-2xl inline mx-1`} /> */}
              <Text> Twitter</Text>
              {/* <BsTwitter style={tw`text-2xl inline mx-1`} /> */}
              <Text> Google</Text>
              {/* <FaGooglePlus style={tw`text-2xl inline mx-1`} /> */}
            </View>
          </View>
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            className="mt-4 lg:mt-0 lg:mx-2 xl:mx-14 3xl:mx-64"
          >
            <Text
              style={tw`card-title text-cs-primary font-bold text-xl lg:text-2xl text-center mt-6 mb-2 `}
            >
              Join the Vwanu Community
            </Text>

            <View style={tw`grid grid-cols-2 flex flex-row`}>
              <Field
                required
                autoCapitalize="none"
                placeholder="First Name"
                name="firstName"
                type="text"
                autoComplete="new-email"
                style={tw`mr-1  w-1/2`}
              />
              <Field
                required
                autoCapitalize="none"
                placeholder="Last Name"
                name="lastName"
                type="text"
                autoComplete="new-email"
                style={tw`w-1/2`}
              />
            </View>
            <Field
              required
              autoCapitalize="none"
              placeholder="Email"
              name="email"
              type="email"
              autoComplete="new-email"
            />
            <Field
              required
              autoCapitalize="none"
              autoCorrect="false"
              placeholder="Password"
              name="password"
              autoComplete="new-email"
              showPassword
            />

            <Field
              required
              autoCapitalize="none"
              autoCorrect="false"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              autoComplete="new-email"
              showPassword
            />

            <View style={tw`ml-2 my-2 flex flex-row items-center `}>
              <Switch name="v" value="f" />
              <View style={tw` ml-2 flex flex-row items-center justify-center`}>
                <Text style={tw`font-semibold text-blue-600 text-lg`}>
                  I agree to the
                </Text>
                <TouchableWithoutFeedback>
                  <Text style={tw`font-semibold text-cs-primary text-lg ml-1`}>
                    Privacy
                  </Text>
                </TouchableWithoutFeedback>
                <Text style={tw`font-semibold text-blue-600 text-lg mx-1`}>
                  and
                </Text>
                <TouchableWithoutFeedback>
                  <Text style={tw`font-semibold text-cs-primary text-lg`}>
                    Policy
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <Submit
              // title="Register"
              title={user.loading ? 'loading' : 'Sign Up'}
            />
          </Form>
          <View style={tw`lg:hidden mb-8 text-center`}>
            <View style={tw`flex flex-row justify-center my-5 items-center `}>
              <Text
                style={tw`text-blue-600  text-center inline text-lg md:text-lg mr-2`}
              >
                Or sign Up with
              </Text>
              <MaterialCommunityIcons
                name="facebook"
                size={30}
                style={tw`text-blue-700 mr-2`}
              />

              <MaterialCommunityIcons
                name="twitter"
                size={30}
                style={tw`text-blue-300 mr-2`}
              />

              <MaterialCommunityIcons
                name="google-plus"
                size={30}
                style={tw`text-red-700 mr-2`}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
// RegisterScreen.propTypes = {}
export default RegisterScreen;
