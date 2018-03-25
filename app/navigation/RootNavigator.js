import { StackNavigator } from 'react-navigation';

import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';

const RootNavigator = StackNavigator({
  Intro: {
    screen: IntroStack
  },

  Home: {
    screen: HomeTabs
  },

}, {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
});

export default RootNavigator;