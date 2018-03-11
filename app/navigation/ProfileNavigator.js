import { StackNavigator } from 'react-navigation';

import ProfilePage from '../screens/ProfileScreen';
import PostDetails from '../screens/PostDetailScreen';
import EditProfile from '../screens/EditProfileScreen';
import ProfileStack from './ProfileStack';

const ProfileNavigator = StackNavigator({
  ProfileStack: {
    screen: ProfileStack
  },

  Edit: {
    screen: EditProfile
  }
});

export default ProfileNavigator;