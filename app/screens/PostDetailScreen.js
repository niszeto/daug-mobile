import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SOCIAL_FEED_MOCK_DATA } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerTintColor: '#fd746c',
    headerTitleStyle: {
      fontSize: 20
    },
  });

  constructor(props){
    super(props);

    const {post} = props.navigation.state.params;

    this.state = {
      member: post,
      isCommented: false,
      isLiked: false,      
    };
  }

  displayComment = (comment,index) =>{
    return(
      <View style={styles.individualCommentContainer} key={index}>
        <TouchableOpacity>
          <Image
            source={{ uri: comment.user.image }}
            style={{
              borderRadius: 25,
              width: 50,
              height: 50,
              margin: 10,
            }}
          />
        </TouchableOpacity>
        
        <View style={styles.nameAndCommentContainer}>
          <TouchableOpacity>
            <Text>{comment.user.name}</Text>
          </TouchableOpacity>
          <Text>{comment.content}</Text>
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

  render() {
    const { navigate } = this.props.navigation;
    const { member, isCommented, isLiked } = this.state;
    
    const Component = member.comments ? ScrollView : View

    return (
      <Component style={styles.mainContainer}>
        <View style={styles.profileInformationContainer} key={member}>

          
            <View style={styles.individualCommentContainer}>
              <TouchableOpacity
              onPress={() => navigate('Profile', { isHeaderShow: true, user: member.user })}
              >
                <Image
                  source={{ uri: member.user.image }}
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
                  onPress={() => navigate('Profile', { isHeaderShow: true, user: member.user })}
                >
                  <Text style={styles.memberNameText} >{member.user.name}</Text>
                </TouchableOpacity>
                <Text>{member.location}</Text>
              </View>
            </View>

          <Image
            source={{ uri: member.user.image }}
            style={{
              width: '100%',
              height: 300,
            }}
            cover={true}
          />
          <Text style={styles.caption}>{member.caption}</Text>

          <View style={styles.timeAndButtonContainer}>
            <Text style={styles.date}>{member.date}</Text>
            <View style={styles.buttonContainer}>

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

        <Text>{member.comments ? member.comments.length : 'NO'} COMMENTS</Text>
        {member.comments && this.renderComments()}
        
      </Component>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
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
  }

});
