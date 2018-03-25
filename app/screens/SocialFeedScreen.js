import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import { SOCIAL_FEED_MOCK_DATA } from '../constants';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { Button, Input } from 'react-native-elements';
import { getUserID, timeSince } from '../utilities/helpers';

export default class App extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Daug',
    headerTintColor: '#fd746c',
    headerTitleStyle: {
      fontSize: 20
    },
  });

  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      isCommented: false,
      isLiked: false,
      posts: null,
    };
  }

  async componentDidMount() {
    this.fetchPosts();

    getUserID()
      .then( (response) => {
        this.setState({userID: response});
        this.fetchUser();
      })
        .catch( (error) => {
          alert("An Error Occured!")
        });
  }

  componentWillMount() {
    DeviceEventEmitter.addListener( 'new_post_created', (event) => {
      this.fetchPosts();
    });
  }

  async fetchPosts() {
    this.setState({ isLoading: true });

    try{
      const response = await fetch(`https://daug-app.herokuapp.com/api/feed`, {
        method: 'GET'
      });

      const responseJSON = await response.json();

      if(response.status === 200){
        console.log(responseJSON);

        this.setState({
          posts: responseJSON, 
          isLoading: false 
        });

      } else {
        const error = responseJSON.message;

        console.log("failed" + error);
      }

    } catch(error) {
      console.log("failed" + error);
    }
  }

  async fetchUser() {

    this.setState({ isLoading: true });

    try{
      const response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userID}`, {
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

  //render one post
  renderMemberPost = (member) => {
    const { isCommented, isLiked } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.itemContainer} key={member}>

          <View style={styles.headerContainer}>
            <View style={styles.avatarNameLocationContainer}>
            <TouchableOpacity
              onPress={() => navigate('Profile',{isHeaderShowing: true, user: member.user})}
            >
              <Image
                source={{ uri: member.user.profile_image || '' }}
                style={{
                  borderRadius: 25,
                  width: 50,
                  height: 50,
                  margin: 10,
                }}
              />
            </TouchableOpacity>
            
              <View style={styles.nameAndLocationContainer}>
                <TouchableOpacity
                  onPress={() => navigate('Profile', { isHeaderShowing: true, user: member.user})}
                >
                  <Text style={styles.memberNameText}>{member.user.name}</Text>
                </TouchableOpacity>
                
                <Text>{member.location}</Text>
              </View>
            </View>
          </View>

        <TouchableOpacity 
          onPress={() => navigate('PostDetail', { post: member })}
        >
          <Image
              source={{ uri: member.image || '' }}
              style={{
                width: '100%',
                height: 300,
              }}
              resizeMode='cover'
              cover={true}
          />
        </TouchableOpacity>
        <Text style={styles.caption}>{member.description}</Text>

        <View style={styles.timeAndButtonContainer}>
          <Text style={styles.date}>{timeSince(member.createdAt)}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.setState({isCommented: !isCommented})}
            >
              <Ionicons
                style={styles.icon}
                name={ isCommented ? "ios-chatbubbles" : "ios-chatbubbles-outline"}
                color={isCommented ? 'black' : null}
                size={30}
              />
            </TouchableOpacity>

            <Text style={styles.iconNumbers}>{member.comments || 0}</Text>

            <TouchableOpacity
              onPress={() => this.setState({isLiked: !isLiked})}
            >
              <Ionicons
                style={styles.icon}
                name={ isLiked ? "ios-heart" : "ios-heart-outline"}
                color={isLiked ? 'red' : null}
                size={30}
              />
            </TouchableOpacity>

            <Text style={styles.iconNumbers}>{member.likes || 0}</Text>

          </View>
        </View>

      </View>
    );
  }

  loadingView(){
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    const { isLoading, posts, user } = this.state;
    console.log(`member object is: ${user}`); 

    return (
      <View style={styles.mainContainer}>

        <View style={styles.createPostContainer}>
        <TouchableOpacity
            onPress={ () => navigate('CreatePost', { member: user })}
          >
            <Text style={styles.createPostLabelStyle}>CreatePost</Text>
          </TouchableOpacity>

          <View style={styles.createPostButtonContainer}>
            <TouchableOpacity>
              <SimpleLineIcons
                style={styles.icon}
                name={"picture"}
                size={25}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ () => navigate('CreatePost', { member: user })}
            >
            
            {/* <TouchableOpacity
              onPress={() => navigate('Profile',{isHeaderShowing: true, user: member.user})}
            > */}

              <SimpleLineIcons
                style={styles.icon}
                name={"plus"}
                size={25}
              />
            </TouchableOpacity>

            
          </View>
        
        </View>

        <ScrollView>

          <FlatList
            data={ posts }
            style={ styles.mainContainer }
            extraData={ this.state }
            keyExtractor={ (item, index) => index }
            renderItem={ ({ item }) => this.renderMemberPost(item) }
            onRefresh={ () => this.fetchPosts() }
            refreshing={ isLoading }
          />

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flexGrow: 1,
    marginBottom: 20,
  },

  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContainer: {
    borderWidth: 0.25,
    borderBottomColor: 'gray',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  avatarNameLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  nameAndLocationContainer: {
    padding: 10,
  },

  memberNameText: {
    color: '#28ABEC'
  },

  createPostContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  createPostLabelContainer: {
    
  },

  createPostLabelStyle: {
    marginLeft: 10,
    fontSize: 20,
  },

  createPostButtonContainer: {
    flexDirection: 'row',
  },

  timeAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
  },

  icon: {
    paddingRight: 10,
    paddingLeft: 10,
  },

  iconNumbers: {
    padding: 5,
  },

  caption: {
    padding: 10,
    backgroundColor: '#F9F9F9',
  },

  date: {
    padding: 20,
  },

});
