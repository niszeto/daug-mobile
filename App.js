import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IntroStack from './app/navigation/IntroStack';
import HomeTabs from './app/navigation/HomeTabs';
import RootNavigator from './app/navigation/RootNavigator';

export default class App extends React.Component {

  render() {
    return (
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

