import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      screen: null,
      description: ''
    };
  }

  async createPost() {
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
    return (
      <View style={styles.mainContainer}>
        <View style={styles.profileInformationContainer}>
          <TouchableOpacity>
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: 'https://vignette.wikia.nocookie.net/en.futurama/images/1/13/Planet_express.png/revision/latest?cb=20130716185556' }}
                style={{
                  borderRadius: 25,
                  width: 50,
                  height: 50,
                  margin: 10,
                }}
              />
                <View style={styles.nameAndLocationContainer}>
                  <Text>Alphonse Elric</Text>
                  <Text>Location</Text>
                </View>
            </View>
          </TouchableOpacity>
          <View style={styles.descriptionContainer}>

          </View>
          <Text>What's on your mind</Text>
          <Input
            onChangeText={description => this.setState({ description })}
          >
          </Input>
          <Button
            onPress={this.createPost.bind(this)}
          >
          </Button>

          
        </View>

        <View style={styles.commentContainer}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    marginTop: 20,
  },

  profileInformationContainer:{
    flex: 1,
    // backgroundColor: 'yellow',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    // backgroundColor: 'red',
  },

  descriptionContainer: {

  },
  
  commentContainer: {
    flex: 1,

    // backgroundColor: 'blue',
  },

});
