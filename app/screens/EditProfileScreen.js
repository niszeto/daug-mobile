import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Header } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class App extends React.Component {

  // static navigationOptions = {
  //   title: 'Edit Profile',
  //   headerStyle: { backgroundColor: '#2F80ED', borderBottomWidth: 0, },
  //   headerTintColor: 'white',
  //   headerTitleStyle: { color: 'white', fontSize: 20 }
  // };

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
      <View style={styles.modalContainer}>
        

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
            <TouchableOpacity>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.accountInformationContainer}>
            <View style={styles.generalInformationContainer}>
              <View style={styles.nameContainer}>
                <Text>Name</Text>
                <Input
                  value={name}
                  onChangeText={name => this.setState({ name })}
                  placeholder="Enter your name here."
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  displayError={false}
                  errorMessage="Please enter a valid name"
                  errorStyle={{ color: 'black' }}
                  containerStyle={styles.textStyle}
                  inputStyle={styles.textInputStyle}
                />
              </View>

              <View style={styles.bioContainer}>
                <Text>Bio</Text>
                <Input
                  value={bio}
                  onChangeText={bio => this.setState({ bio })}
                  placeholder="Write your bio here."
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  displayError={false}
                  errorStyle={{ color: 'black' }}
                  containerStyle={styles.textStyle}
                  inputStyle={styles.textInputStyle}
                />
              </View>
            </View>
            
            <View style={styles.privateInformationContainer}>
              <View style={styles.privateInformationTextContainer}>
                <Text style={styles.privateInformationText}>Private Information</Text>  
              </View>
              <View style={styles.emailContainer}>
                <Text>Email</Text>
                <Input
                  value={email}
                  onChangeText={email => this.setState({ email })}
                  placeholder="Enter your email here."
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  displayError={false}
                  errorMessage="Please enter a valid email address"
                  errorStyle={{ color: 'black' }}
                  containerStyle={styles.textStyle}
                  inputStyle={styles.textInputStyle}
                />
              </View>
            </View>
          </View>
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
  },




  mainContainer: {
    flex: 1,
  },

  headerContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  changePhotoText: {
    marginTop: 20,
    fontSize: 20,
    color: '#28ABEC'
  },

  accountInformationContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  generalInformationContainer: {
    flex: 1,
    width: '90%'
  },

  privateInformationContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  
  privateInformationTextContainer:{
    width: '100%',
    backgroundColor: 'gray',
    marginTop: 30,
    marginBottom: 5
  },

  privateInformationText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 15,
  },

  emailContainer: {
    flex: 1,
    width: '90%'
  },

  textStyle: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },

  textInputStyle: {
    color: 'black',
    width: '100%'
  }

});
