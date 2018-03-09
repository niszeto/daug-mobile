import { StackNavigator } from 'react-navigation';

import ProfilePage from '../screens/ProfileScreen';
import PostDetails from '../screens/PostDetailScreen';
import EditProfile from '../screens/EditProfileScreen';
import CreatePost from '../screens/CreatePostScreen';
import SocialStack from '../navigation/SocialStack';
import IntroStack from './IntroStack'

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