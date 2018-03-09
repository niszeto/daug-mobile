import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      screen: null
    };
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
    backgroundColor: 'yellow',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: 'red',
  },

  descriptionContainer: {

  },
  
  commentContainer: {
    flex: 1,

    backgroundColor: 'blue',
  },

});
