import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, DeviceEventEmitter, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { SOCIAL_FEED_MOCK_DATA } from '../constants';
import { getUserID, onSignOut } from '../utilities/helpers';

export default class App extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerVisible: navigation.state.params ? navigation.state.params.isHeaderShowing : false,
      title: 'Profile',
      headerStyle: { backgroundColor: '#2F80ED', borderBottomWidth: 0, },
      headerTintColor: 'white',
      headerTitleStyle: { color: 'white', fontSize: 20 }
    }
  };

  constructor(props) {
    super(props);

    const user = props.navigation.state.params && props.navigation.state.params.user;
    const isHeaderShowing = props.navigation.state.params && props.navigation.state.params.isHeaderShowing;

    this.state = {
      isLoading: false,
      user: user || null,
      isHeaderShowing: isHeaderShowing || false
    }

  }

  async componentDidMount() {
    getUserID()
      .then( (response) => {
        this.setState({ userID: response});
        this.state.user === null && this.fetchUser();
      })
        .catch( (error) => {
          alert("An error occured!");
        });
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('user_profile_updated', (event) => {
      this.fetchUser();
    });
  }

  async fetchUser() {
    
    this.setState({ isLoading: true });

    try{
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userID}`, {
        method: 'GET'
      });

      let responseJSON = null;

      if(response.status === 200){
        responseJSON = await response.json();

        console.log(responseJSON);

        this.setState({
          user: responseJSON, 
          isLoading: false 
        });

      } else {
        responseJSON = await response.json();
        const error = responseJSON.message;

        console.log("failed" + error);
      }

    } catch(error) {
      console.log("failed" + error);
    }
  }

  loadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  contentView() {
    const { user, isHeaderShowing } = this.state;
    const { navigate } = this.props.navigation;

    return (

      <ScrollView>
        <View style={styles.mainContainer}>

          <View style={styles.headerImageContainer}>
            <Image
              style={{
                height: 175,
                width: '100%'
              }}
              source={{ uri: user.banner || ''}}
              resizeMode='cover'
            />
          </View>

          <View style={styles.contentContainer}>

            <View style={styles.profileDetailsMainContainer}>

              <View style={styles.profileDetailsSubContainer}>
                <View style={styles.avatarContainer}>
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                    }}
                    source={{ uri: user.profile_image || '' }}
                    resizeMode='cover'
                  />
                </View>

                <View style={styles.textAndButtonContainer}>

                  <View style={styles.textContainer}>

                    <View style={styles.textSubContainer}>
                      <Text style={styles.textStyle}>{user.posts ? user.posts.length : '0'}</Text>
                      <Text>Posts</Text>
                    </View>

                    <View style={styles.textSubContainer}>
                      <Text style={styles.textStyle}>{user.followers.length || 0}</Text>
                      <Text>Followers</Text>
                    </View>
                    <View style={styles.textSubContainer}>
                      <Text style={styles.textStyle}>{user.following.length || 0}</Text>
                      <Text>Following</Text>
                    </View>

                  </View>

                  <View style={styles.editProfileButtonContainer}>
                    {
                      !isHeaderShowing ?
                        <Button
                          text='Edit Profile'
                          onPress={() => navigate('Edit', { user: user})}
                        /> :
                        
                        <Button
                          text='Follow'
                          onPress={() => console.log('Followed')}
                        />
                    }
                  </View>

                </View>

              </View>

            </View>

            <View style={styles.descriptionContainer}>
              <Text>{user.name}</Text>
              <Text>{user.bio}</Text>
            </View>

          </View>
          
          <Text>{user.posts ? user.posts.length : 'NO' } POSTS</Text>
          <View style={styles.footerContainer}>
          {
            !isHeaderShowing &&
            <Button
              style={styles.logoutButtonContainer}
              text='Logout'
              onPress={() => onSignOut().then( () => navigate("Intro"))}
              textStyle={styles.buttonTextStyle}
            />
          }
          </View>

        </View>
      </ScrollView>

    ); 
  }

  render() {
    const { navigate } = this.props.navigation;
    const { user, isHeaderShowing, isLoading } = this.state;

    return (
      isLoading || user === null ? this.loadingView() : this.contentView()
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  headerImageContainer: {
    flex: 2,
  },

  contentContainer: {
    flex: 2,
    backgroundColor: '#F9F9F9',
  },

  profileDetailsMainContainer: {
    flex: 1,
  },

  profileDetailsSubContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  avatarContainer: {
    flex: 1,
    marginLeft: 20,
  },

  textAndButtonContainer: {
    flex: 3,
  },

  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  textSubContainer: {
    justifyContent: 'center'
  },

  editProfileButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  textStyle: {
    textAlign: 'center',
  },

  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },

  footerContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButtonContainer: {
    height: 50,
    width: 300,
  },

  buttonTextStyle: {
    fontSize: 25,
  }

});
