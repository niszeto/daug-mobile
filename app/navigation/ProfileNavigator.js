import { StackNavigator } from 'react-navigation';

import EditProfile from '../screens/EditProfileScreen';
import ProfileStack from './ProfileStack';

const ProfileNavigator = StackNavigator({
  ProfileStack: {
    screen: ProfileStack
  },

  Edit: {
    screen: EditProfile
  }
}, {
  initialRouteName: 'ProfileStack',
  mode: 'modal',
  headerMode: 'none'
});

export default ProfileNavigator;