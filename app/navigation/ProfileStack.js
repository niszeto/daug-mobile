import { StackNavigator } from 'react-navigation';

import ProfilePage from '../screens/ProfileScreen';
import PostDetails from '../screens/PostDetailScreen';

const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfilePage
  },

  Post: {
    screen: PostDetails
  },
});

export default ProfileStack;