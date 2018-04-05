import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { SOCIAL_FEED_MOCK_DATA } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { timeSince, getUserID } from '../utilities/helpers';
import { Button, Icon, Input} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class App extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Post',
    headerStyle: { backgroundColor: '#2F80ED', borderBottomWidth: 0, },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white', fontSize: 20 }
  });

  constructor(props){
    super(props);

    const postID = props.navigation.state.params && props.navigation.state.params.postID;

    this.state = {
      member: null,
      postID: postID || null,
      comment: null,
      isLiked: false,      
    };
  }

  async componentDidMount() {
    const { postID } = this.state

    if (postID === null) {
      Alert.alert(
        'Unable to display Post!',
        'Please try again later',
        [
          {
            text: "OK", onPress: () => {
              this.props.navigation.goBack();
            }
          }
        ],
        { cancelable: false }
      )
    } else {
      this.fetchPost();
    }

    getUserID()
      .then(response => {
        this.setState({ userID: response });
        this.fetchUser();
      })
      .catch( (error) => {
        alert("An error occurred");
      });

  }

  async fetchPost() {
    this.setState({ isLoading: true });

    const { postID } = this.state;

    try{
      const response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postID}`, {
        method: 'GET'
      });

      const responseJSON = await response.json();

      if(response.status === 200){
        console.log(responseJSON);

        this.setState({
          member: responseJSON, 
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

  async postComment() {
    const { comment, postID, user } = this.state

    var details = {
      'comment': comment
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postID}/comment/${user.id}`, {
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

        this.fetchPost()
        this.setState({ comment: null })

        Alert.alert(
          'Comment added!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("comment added!")
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, comment: null })

        Alert.alert('Unable to add new comment!', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, comment: null })

      Alert.alert('Unable to add new comment!', `${error}`)
    }
  }

  displayComment = (comment,index) => {
    const { navigate } = this.props.navigation;

    return(
      <View style={styles.individualCommentContainer} key={index}>
        <TouchableOpacity
          onPress={() => navigate('Profile', { isHeaderShowing: true, userID: comment.user.id })}
        >
          <Image
            source={{ uri: comment.user.profile_image || '' }}
            style={{
              borderRadius: 25,
              width: 50,
              height: 50,
              margin: 10,
            }}
          />
        </TouchableOpacity>
        
        <View style={styles.nameAndCommentContainer}>
          <TouchableOpacity
            onPress={() => navigate('Profile', { isHeaderShowing: true, userID: comment.user.id })}
          >
            <Text>{comment.user.name}</Text>
          </TouchableOpacity>
          <Text>{comment.description}</Text>
        </View>
      </View>
    )
  }

  renderComments = () => {
    const { comments } = this.state.member;

    return (
      <View style={styles.commentsContainer}>
        {
          comments.map((comment, index) => {
            return this.displayComment(comment, index);
          })
        }
      </View>
    )
  }

  renderAddComment = () => {
    const { comment } = this.state;

    return(
      <View style={styles.commentsContainer}>
        <View style={styles.commentContainer}>
          <Ionicons
            name='ios-chatbubbles'
            color='black'
            size={25}
            containerStyle={{marginHorizontal: 10}}
          />
          <Input containerStyle={{width: '100%'}}
            value={comment}
            onChangeText={comment => this.setState({ comment })}
            placeholder="Enter a comment"
            placeholderTextColor="gray"
            inputStyle={{ color: 'black', fontSize: 14 }}
            onSubmitEditing={() => {
              this.postComment()
            }}
          />
        </View>
      </View>
    )
  }

  async postLike() {
    const { postID, user } = this.state

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postID}/like/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.fetchPost()
        this.setState({ isLiked: true })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, liked: false })

        Alert.alert('Unable to like post', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, isLiked: false })

      Alert.alert('Unable to like post', `${error}`)
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
    const { navigate } = this.props.navigation;
    const { member, isLiked } = this.state;
    
    const Component = member && member.comments ? KeyboardAwareScrollView : KeyboardAvoidingView;

    return (
      <Component style={styles.mainContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <View style={styles.profileInformationContainer} key={member}>

          
            <View style={styles.individualCommentContainer}>
              <TouchableOpacity
              onPress={() => navigate('Profile', { isHeaderShow: true, userID: member.user.id })}
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
                  onPress={() => navigate('Profile', { isHeaderShow: true, userID: member.user.id })}
                >
                  <Text style={styles.memberNameText} >{member.user.name}</Text>
                </TouchableOpacity>
                {member.location && 

                  <Text>{member.location}</Text>

                }
              </View>
            </View>

          <Image
            source={{ uri: member.image || '' }}
            style={{
              width: '100%',
              height: 300,
            }}
            cover={true}
          />
          <Text style={styles.caption}>{member.caption}</Text>

          <View style={styles.timeAndButtonContainer}>
            <Text style={styles.date}>{timeSince(member.createdAt)}</Text>
            <View style={styles.buttonContainer}>

              <TouchableOpacity
                onPress={() => this.postLike()}
              >
                <Ionicons
                  style={styles.icon}
                  name={ isLiked ? "ios-heart" : "ios-heart-outline"}
                  color={isLiked ? 'red' : null}
                  size={30}
                />
              </TouchableOpacity>

              <Text style={styles.iconNumbers}>{!! member.likes &&member.likes.length || 0}</Text>

            </View>
          </View>
        </View>

        <Text>{member.comments ? member.comments.length : 'NO'} COMMENTS</Text>
        {member.comments && this.renderComments()}
        {this.renderAddComment()}
      </Component>
    );
  }

  render() {
    const { member, isLoading } = this.state;

    return(
      isLoading || member === null ? this.loadingView() : this.contentView()
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
  },

  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileInformationContainer:{
    backgroundColor: 'white',
    borderColor: '#aaaaaa'

  },

  postHeaderContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },

  memberNameText: {
    color: '#28ABEC'
  },

  individualCommentContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(244,244,244,1)',
  },

  timeAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  commentsContainer: {
    backgroundColor: 'white',
  },   

  commentContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(244,244,244,1)',
},

});
