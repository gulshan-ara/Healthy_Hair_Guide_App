import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { auth, db } from '../firebase';
import { useState, useEffect } from 'react';

/** Home page contains three buttons for navigating to other pages. This custom
 * component represents one button which can be pressed and will navigate on press.
 */
const HomeButton = ({ title, navigation, screen }) => {
  return (
    <View style={styles.lowerShadow}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate(screen)}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  // some states for checking if the user is existing or new
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Here this hook is deciding which page to show onPress of customised routine button
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // isLoggedIn state helps identifying login state of user
        setIsLoggedIn(true);
        // checking if there's any data in the database related to current user
        let docRef = db.collection('users').doc(auth.currentUser?.email);
        docRef.get().then((doc) => {
          if (doc.exists) {
            setHasData(true);
          } else {
            setHasData(false);
          }
          setIsLoading(false);
        });
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });
  }, []);

  // until data is fetched from db, an activity indicator will be shown.
  if (isLoading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator
          size="large"
          color="blueviolet"
        />
      </View>
    );
  }

  /**  if user is not logged in, he/she'll be taken to login page. 
   * if user is logged in but didn't submit the quiz answer, he/she'll be taken to quiz page
   * if user answered the quiz earlier, he/she'll be taken to the routine page
  */
  const loggedInScreen = (isLoggedIn && hasData) ? 'CustomRoutine' : 'Hair Quiz';
  const renderedScreen = isLoggedIn ? loggedInScreen : 'Authentication';

  // UI design of home page including 1 background image, 1 logo image, 1 app name and 3 buttons
  return (
    <ImageBackground
      source={require('../assets/background.jpeg')}
      resizeMode="cover"
      style={styles.container}>
      <View style={styles.logo}>
        <ImageBackground
          source={require('../assets/rapunzel.jpg')}
          resizeMode="cover"
          style={{ margin: 10 }}
          imageStyle={{ borderRadius: 10 }}>
          <View style={styles.logoImgView}></View>
        </ImageBackground>
        <Text style={styles.logoText}>Healthy Hair Guide</Text>
      </View>
      <View style={styles.menu}>
        <HomeButton
          title="Hair Hacks"
          navigation={navigation}
          screen="Hair Hacks"
        />
        <HomeButton
          title="Customised Routine"
          navigation={navigation}
          screen={renderedScreen}
        />
        <HomeButton 
          title="Explore"
          navigation={navigation} 
          screen="Explore" 
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 30,
    marginVertical: 20,
    marginHorizontal: 25,
    alignItems: 'center',
  },
  logoImgView: {
    width: 200,
    height: 200,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  },
  logoText: {
    color: 'plum',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadowRadius: 5,
    textShadowColor: 'lavender',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  menu: {
    marginTop: 30,
    padding: 10,
    position: 'absolute',
    top: 350,
    width: '90%',
  },
  menuButton: {
    backgroundColor: 'lavender',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'white',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 12,
  },
  lowerShadow: {
    marginVertical: 10,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'blue',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1.0,
    shadowRadius: 5,
    elevation: 12,
  },
  buttonText: {
    color: 'blueviolet',
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 3,
    textAlign: 'center',
  },
});
