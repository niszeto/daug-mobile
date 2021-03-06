import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, Alert, TouchableOpacity, DeviceEventEmitter, ImageEditor } from 'react-native';
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Header } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RNS3 } from 'react-native-aws3';

export default class App extends React.Component {

  constructor(props){
    super(props);

    const { user } = props.navigation.state.params;

    this.state = {
      isLoading: false,
      ...user
    };
  }

  submitProfile = async ()  => {
    this.setState({ isLoading: true });

    const { name, bio, profile_image } = this.state;

    var details = {
      'name': name,
      'bio': bio,
      'profile_image': profile_image
    };

    var formBody = [];

    for(var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })

        Alert.alert(
          'Profile updated!',
          '',
          [
            { text: "Dismiss", onPress: () => {
              DeviceEventEmitter.emit('user_profile_updated', {})
              this.props.navigation.goBack()
            }}
          ],
          { cancelable: false }
        )

      } else {

        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })

        Alert.alert('Unable to update profile!', `${error}`)

      }
    } catch (error) {

      this.setState({ isLoading: false, response: error })

      Alert.alert('Unable to update profile!', `${error}`)
    }

  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('Profile Image cancelled');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: result.width, height: result.height },
          resizeMode: 'contain',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });

    // this gives you a rct-image-store URI or a base64 image tag that
    // you can use from ImageStore

    const file = {
      uri: resizedUri,
      name: `user_${this.state.id}_profile_image_${new Date().getTime()}.png`,
      type: "image/png"
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "daug",
      region: "us-east-1",
      accessKey: "AKIAIKG2UJ7AHBKJ5N2Q",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201){
        throw new Error("Failed to upload image to S3");
      }

        console.log(response.body);

        this.setState({ profile_image: response.body.postResponse.location });
    });
  };

  render() {
    const { name, bio, email, profile_image } = this.state;

    return (
      <View style={styles.modalContainer}>
        <Header
          leftComponent={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.mainContentContainer}>
              <View style={styles.headerLeftAndRightComponentContainer}>
                <Text style={styles.headerLeftAndRightComponentTextStyle}>Cancel</Text>
              </View>
            </TouchableOpacity>
          }

          centerComponent={
            {
              text: 'Edit Profile',
              style: styles.headerCenterComponentStyle
            }
          }

          rightComponent={
            <TouchableOpacity onPress={this.submitProfile} style={styles.mainContentContainer}>
              <View style={styles.headerLeftAndRightComponentContainer}>
                <Text style={styles.headerLeftAndRightComponentTextStyle}>Done</Text>
              </View>
            </TouchableOpacity>
          }
          innerContainerStyles={styles.headerInnerContainer}
          outerContainerStyles={styles.headerOuterContainer}
        />

        <View style={styles.mainContentContainer}>
          <View style={styles.avatarContainer}>
            <Image
                  source={{ uri: profile_image || '' }}
                  style={{
                    borderRadius: 75,
                    width: 150,
                    height: 150,
                  }}
                  resizeMode='cover'
                />
            <TouchableOpacity onPress={ () => this.pickImage()}>
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

  headerInnerContainer: {
    alignItems: 'center',
    paddingTop: 30
  },

  headerOuterContainer: {
    height: 90
  },
  
  headerLeftAndRightComponentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerLeftAndRightComponentTextStyle: {
    fontSize: 15, 
    color: 'black'
  },

  headerCenterComponentStyle: {
    fontSize: 20,
    color:'white'
  },

  mainContentContainer: {
    flex: 1,
  },

  avatarContainer: {
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
