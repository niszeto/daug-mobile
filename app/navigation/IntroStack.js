import { StackNavigator } from 'react-navigation';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';


const IntroStack =  StackNavigator({
  Intro: {
    screen: IntroScreen
  },

  Login: {
    screen: LoginScreen
  },

  Signup: {
    screen: SignupScreen
  },

});

export default IntroStack;