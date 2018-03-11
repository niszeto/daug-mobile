import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IntroStack from './app/navigation/IntroStack';
import HomeTabs from './app/navigation/HomeTabs';
import RootNavigator from './app/navigation/RootNavigator';

import EditProfileScreen from './app/screens/EditProfileScreen';
import CreatePostScreen from './app/screens/CreatePostScreen';
import PostDetailScreen from './app/screens/PostDetailScreen';

import ProfileStack from './app/navigation/ProfileStack';

export default class App extends React.Component {

  render() {
    return (

      // <CreatePostScreen/>
      // <EditProfileScreen/>

      <RootNavigator/>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

