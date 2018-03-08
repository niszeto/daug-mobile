import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      bio: '',
      email: '',
    };
  }

  render() {
    const {name,bio,email} = this.state;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Image
                source={{ uri: 'https://static.pexels.com/photos/36347/cow-pasture-animal-almabtrieb.jpg' }}
                style={{
                  borderRadius: 75,
                  width: 150,
                  height: 150,
                }}
              />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </View>
        <View style={styles.accountInformationContainer}>
          <View style={styles.generalInformationContainer}>
            <View style={styles.nameContainer}>
              <Text>Name</Text>
              <Input
                value={name}
                onChangeText={name => this.setState({ name })}
                placeholder="Enter your name here."
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                displayError={false}
                errorMessage="Please enter a valid name"
                errorStyle={{ color: 'white' }}
                containerStyle={styles.textInput}
                inputStyle={{ color: 'white' }}
              />
            </View>

            <View style={styles.bioContainer}>
              <Text>Bio</Text>
              <Input
                value={bio}
                onChangeText={bio => this.setState({ bio })}
                placeholder="Write your bio here."
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                displayError={false}
                errorStyle={{ color: 'white' }}
                containerStyle={styles.textInput}
                inputStyle={{ color: 'white' }}
              />
            </View>
          </View>
          
          
          <View style={styles.privateInformationContainer}>
            <Text>Private Information</Text>  
            <View style={styles.emailContainer}>
              <Text>Email</Text>
              <Input
                value={email}
                onChangeText={email => this.setState({ email })}
                placeholder="Enter your email here."
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                displayError={false}
                errorMessage="Please enter a valid email address"
                errorStyle={{ color: 'white' }}
                containerStyle={styles.textInput}
                inputStyle={{ color: 'white' }}
              />
            </View>
          </View>
          
        </View>
        <View style={styles.footerContainer}>
              
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
  },

  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },

  changePhotoText: {
    backgroundColor: 'green',
  },

  accountInformationContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: 'red',
  },

  generalInformationContainer: {
    flex: 1,
  },

  privateInformationContainer:{
    flex: 1,
  },

  emailContainer: {

  },

  textInput: {
    backgroundColor: 'black'
  },

  footerContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  }
});
