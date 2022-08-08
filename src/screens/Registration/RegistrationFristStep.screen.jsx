import React from 'react';
import { View, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StepIndicator from 'react-native-step-indicator';

// Core components
import tw from '../../lib/tailwind';
import { image } from '../../config';
import { PersonalInfo, ProfilePicture, FindFriends } from '.';

const steps = [
  { name: 'some 1', component: PersonalInfo },
  { name: 'some 2', component: ProfilePicture },
  { name: 'some 3', component: FindFriends },
];
// const Stack = createNativeStackNavigator()
const labels = [
  'Sign Up',
  'Personal Information',
  'Profile Picture',
  'Find friends',
];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

const RegistrationStepsContainer = () => {
  const [currentPosition, setCurrentPosition] = React.useState(1);
  const Step = steps[currentPosition - 1].component;
  const { log } = console;
  const handleSubmit = (data) => {
    if (data) {
      log(data);
    }
    if (currentPosition < labels.length) {
      setCurrentPosition((position) => position + 1);
    }
  };

  return (
    <View style={tw`mx-0 flex flex-1 lg:h-screen bg-gray-300 `}>
      <View
        style={tw`bg-gray-500 flex-1 grid grid-cols-1 lg:mb:0 lg:grid-cols-2`}
      >
        <View style={tw`inline lg:hidden`}>
          <LinearGradient
            colors={[tw.color('g-one/[0.78]'), tw.color('g-two/[0.78]')]}
            locations={[0.2, 0.8]}
            style={tw`h-96 z-0 lg:h-screen`}
          >
            <View style={tw`pt-14 py-5`}>
              <Image
                style={tw` mt-10 mx-auto`}
                source={image.log}
                alt="image.log_vwanu"
              />
            </View>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
            />
          </LinearGradient>
          <Image
            source={image.Shape_up}
            alt="_shape_down"
            style={tw`hidden lg:block w-[23%] lg:absolute left-0 z-30 bottom-0 object-fit rotate-180`}
          />
        </View>

        <View
          style={tw` bg-white flex-1 flex shadow-t-2xl rounded-t-[30px] lg:rounded-none px-2 md:px-8 -mt-28 z-10 md:mx-36 lg:mt-0 lg:mx-0 lg:h-screen pt-5`}
        >
          <Step
            handleSubmit={handleSubmit}
            onBack={() => {
              if (currentPosition <= 1) {
                return Alert.alert('You can not go back');
              }
              return setCurrentPosition((position) => position - 1);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RegistrationStepsContainer;
