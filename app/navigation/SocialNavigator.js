import { StackNavigator } from 'react-navigation';

import CreatePost from '../screens/CreatePostScreen';
import SocialStack from '../navigation/SocialStack';

const SocialNavigator = StackNavigator({
  SocialStack: {
    screen: SocialStack
  },

  CreatePost: {
    screen: CreatePost
  }
}, {
  initialRouteName: 'SocialStack',
  mode: 'modal',
  headerMode: 'none'
});

export default SocialNavigator;