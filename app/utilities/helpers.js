import { AsyncStorage, Platform } from 'react-native';

//API url helper
const IOS_ANDROID_LOCALHOST = Platform.OS === 'ios' ? 'localhost' : '10.0.0.116';
export const ENV_URL = __DEV__ ? `http://${IOS_ANDROID_LOCALHOST}:3000` : "https://daug-app.herokuapp.com"

// createdAt display helper
export const timeSince = (timeStamp) => {
  let now = new Date();
  let secondsPast = (now.getTime() - new Date(timeStamp).getTime()) / 1000;

  if(secondsPast < 60){
    return parseInt(secondsPast) + ' s ago';
  }

  if(secondsPast < 3600){
    return parseInt(secondsPast / 60) + ' m ago';
  }

  if(secondsPast <= 86400){
    return parseInt(secondsPast / 3600) + ' h ago';
  }

  if(secondsPast > 86400){
  day = new Date(timeStamp).getDate();
  month = new Date(timeStamp).toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
  year = new Date(timeStamp).getFullYear() === now.getFullYear() ? "" : " " + new Date(timeStamp).getFullYear();
  return day + " " + month + year;
  }
}

// Auth navigation helpers
export const USER_KEY = "secret-user-key-123-xyz";
export const USER_ID = "some-random-user-id-123-xyz";

export const onSignIn = (userID) => AsyncStorage.multiSet([[USER_KEY, "true"], [USER_ID, userID.toString()]]);

export const onSignOut = () => AsyncStorage.multiRemove([USER_KEY, USER_ID]);

export const getUserID = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_ID)
      .then(response => {
        if(response !== null){
          resolve(response)
        }else{
          resolve(null);
        }
      })
        .catch(error => reject(error));
  });
};

export const isSignedIn = () => {
  return new Promise((resolve,reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(response => {
        if(response !== null){
          resolve(true);
        }else{
          resolve(false);
        }
      })
        .catch(error => reject(error));
  });
};