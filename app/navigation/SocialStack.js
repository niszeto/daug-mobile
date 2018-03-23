import { StackNavigator }  from 'react-navigation';

import SocialFeedScreen from '../screens/SocialFeedScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const SocialStack = StackNavigator({
  SocialFeed: {
    screen: SocialFeedScreen
  },
  PostDetail: {
    screen: PostDetailScreen
  },
  Profile: {
    screen: ProfileScreen
  }
});

export default SocialStack;