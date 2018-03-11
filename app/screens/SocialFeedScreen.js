import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { SOCIAL_FEED_MOCK_DATA } from '../constants';
import { FontAwesome, SimpleLineIcons, Ionicons } from '@expo/vector-icons';

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
      screen: null,
      fontLoaded: false,
      isCommented: false,
      isLiked: false,
    };
  }

  //render one post
  renderMemberPost = (member) => {
    const {isCommented, isLiked} = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.itemContainer} key={member}>

        <TouchableOpacity
        onPress={() => navigate('Profile',{isHeaderShowing: true, user: member.user})}
        >
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: member.image }}
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

        <TouchableOpacity 
          onPress={() => navigate('PostDetail', {post: member})}
        >
          <Image
              source={{ uri: member.image }}
              style={{
                width: '100%',
                height: 300,
              }}
              resizeMode='cover'
              cover={true}
          />
        </TouchableOpacity>
        <Text style={styles.caption}>{member.caption}</Text>

        <View style={styles.timeAndButtonContainer}>
          <Text style={styles.date}>{member.date}</Text>
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

            <Text style={styles.iconNumbers}>{member.likes}</Text>

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
            <Text style={styles.iconNumbers}>{member.comments ? member.comments.length : 0}</Text>


          </View>
        </View>

      </View>
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={styles.mainContainer}>

        <FlatList
          data={SOCIAL_FEED_MOCK_DATA}
          style={styles.mainContainer}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this.renderMemberPost(item)}

        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flexGrow: 1,
  },

  itemContainer: {
    borderWidth: 0.25,
    borderBottomColor: 'gray',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  nameAndLocationContainer: {
    padding: 10,
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
