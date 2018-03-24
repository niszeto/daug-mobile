import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Button, Input, Header, Icon } from 'react-native-elements';

export default class App extends React.Component {

  constructor(props){
    super(props);

    const { member } = props.navigation.state.params;

    this.state = {
      description: '' ,
      member
    };
  }

  createPost = async() => {
    // this.setState({ isLoading: true })

    const { description } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'description' : description
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/1/posts`, {
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

        // this.setState({ isLoading: false })
        Alert.alert(
          'Post Created!',
          'You have successfully created a post!',
          [
            { text: "Continue", onPress: () => navigate("Home") }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        // this.setState({ isLoading: false, errors: responseJSON.errors })
        this.setState({ errors: responseJSON.errors })

        Alert.alert('Post not created!', `Unable to create post.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Create post failed!', 'Unable to Create Post. Please try again later')
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    const { member, description } = this.state;

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
              source={{ uri: member.user.image }}
              style={{
                borderRadius: 25,
                width: 50,
                height: 50,
                margin: 10,
              }}
            />
            <View style={styles.nameAndLocationContainer}>
              <Text>{member.user.name}</Text>
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
  }

});
