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

  render() {
    const { navigate } = this.props.navigation;
    const { member, isCommented, isLiked } = this.state;
    
    const Component = member.comments ? ScrollView : View

    return (
      <View style={styles.mainContainer}>
        <View style={styles.profileInformationContainer} key={member}>
          <TouchableOpacity
            onPress={() => navigate('Profile', { isHeaderShow: true, user: member.user })}
          >
            <View style={styles.headerContainer}>
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
                <Text>{member.location}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <Image
            source={{ uri: member.user.image }}
            style={{
              width: '100%',
              height: '50%',
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

        <View style={styles.commentContainer}>
          <Text>{member.comments ? member.comments.length : 'NO'} COMMENTS</Text>

          <View style={styles.headerContainer}>
            <Image
              source={{ uri: 'https://pbs.twimg.com/profile_images/741947087978434560/6NpW135K_400x400.jpg' }}
              style={{
                borderRadius: 25,
                width: 50,
                height: 50,
                margin: 10,
              }}
            />
            <View style={styles.nameAndCommentContainer}>
              <Text>Philip J. Fry</Text>
              <Text>Hey, what smells like blue?</Text>
            </View>
            
          </View>


                    <View style={styles.headerContainer}>
            <Image
              source={{ uri: 'https://res.cloudinary.com/teepublic/image/private/s--vxtKJItA--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1478190929/production/designs/769348_1.jpg' }}
              style={{
                borderRadius: 25,
                width: 50,
                height: 50,
                margin: 10,
              }}
            />
            <View style={styles.nameAndCommentContainer}>
              <Text>Rick Sanchez</Text>
              <Text>Wubbalubbadubdub!</Text>
            </View>
            
          </View>

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
    flex: 3,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

  commentContainer: {
    flex: 2,
    marginTop: 30,
  },

});
