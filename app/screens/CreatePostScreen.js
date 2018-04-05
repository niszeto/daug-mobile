import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, DeviceEventEmitter, ImageEditor } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Button, Input, Header, Icon } from 'react-native-elements';
import { getUserID } from '../utilities/helpers';
import { RNS3 } from 'react-native-aws3';
import { ImagePicker } from 'expo';

export default class App extends React.Component {

  constructor(props){
    super(props);

    const { member } = props.navigation.state.params;

    this.state = {
      isLoading: false,
      description: '' ,
      member,
      image: null
    };
  }

  async componentDidMount() {
    getUserID()
      .then( (response) => this.setState({ userID: response } ))
        .catch( (error) => { 
          console.log(error); 
          alert("An Error Occured!"); 
        });
  }

  createPost = async() => {
    this.setState({ isLoading: true })

    const { description, image } = this.state
    const { navigate } = this.props.navigation

    var details = {};

    if(image !== null) {
      details.image = image;
    }

    if(description !== null && description.length > 0) {
      details.description = description;
    }

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userID}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })

        Alert.alert(
          'Post Created!',
          'You have successfully created a post!',
          [
            { text: "Dismiss", onPress: () => {
              DeviceEventEmitter.emit('new_post_created', {});
              this.props.navigation.goBack();
            }}
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message;

        console.log(responseJSON);

        this.setState({ isLoading: false, errors: responseJSON.errors });

        Alert.alert('Post not created!', `Unable to create post.. ${error}!`);
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error });

      Alert.alert('Create post failed!', 'Unable to Create Post. Please try again later', `${error}`);
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
      // `uri` can also be a file system path (i.e. file://)
      uri: resizedUri,
      name: `user_${this.state.member.id}_post_${new Date().getTime()}.png`,
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
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");

      console.log(response.body);

      this.setState({ image: response.body.postResponse.location });
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { member, description, image } = this.state;
    console.log('hello there');
    console.log(member);

    return (
      <View style={styles.mainContainer}>
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
              text: 'Create Post',
              style: styles.headerCenterComponentStyle
            }
          }

          rightComponent={
            <TouchableOpacity onPress={this.createPost} style={styles.mainContentContainer}>
              <View style={styles.headerLeftAndRightComponentContainer}>
                <Text style={styles.headerLeftAndRightComponentTextStyle}>Share</Text>
              </View>
            </TouchableOpacity>
          }
          innerContainerStyles={styles.headerInnerContainer}
          outerContainerStyles={styles.headerOuterContainer}
        />        

        <View style={styles.profileInformationContainer}>
          
          <View style={styles.avatarNameLocationContainer}>
            <Image
              source={{ uri: member.profile_image || '' }}
              style={{
                borderRadius: 25,
                width: 50,
                height: 50,
                margin: 10,
              }}
            />
            <View style={styles.nameAndLocationContainer}>
              <Text>{member.name}</Text>
              <TouchableOpacity style={styles.locationContainer}>
                <SimpleLineIcons
                  name='location-pin'
                  style={styles.locationIcon}
                  size={15}
                />
                <Text>Add Location</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <TextInput
              value={description}
              onChangeText={(description) => this.setState({ description })}
              placeholder="What would you like to share?"
              placeholderTextColor="gray"
              multiline={true}
              style={styles.description}
            >
            </TextInput>

          </View>

          <View style={styles.createPostImageContainer}>
              {this.state.image ?
                <Image source={{ uri: image }} style={styles.postImage} resizeMode="cover" /> :
                <View style={styles.createAddPostImageContainer}>
                  <Text style={styles.orLabel}>OR</Text>
                  <TouchableOpacity style={styles.cameraIconView} onPress={this.pickImage}>
                    <SimpleLineIcons
                      name='camera'
                      style={{ color: '#aaaaaa' }}
                      size={42}
                    />
                  </TouchableOpacity>
                </View>
              }
          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
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

  profileInformationContainer:{
    flex: 1,
    justifyContent: 'center',
  },

  avatarNameLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  nameAndLocationContainer: {

  },

  locationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },

  locationIcon: {
    marginRight: 5,
  },

  descriptionContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  
  description: {
    height: 250,
    width: '100%',
    fontSize: 25,
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
  },

  createPostImageContainer: {
    flex: 2
  },

  postImage: {
    width: '100%',
    height: 250
  },

  createAddPostImageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 200
  },

  orLabel: {
    flex: 1,
    color: '#aaaaaa',
    fontSize: 26,
    marginTop: 40,
    fontWeight: 'bold'
  },

  cameraIconView: {
    flex: 1,
  }

});
