import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const UserAuthenticationScreen = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // email format checker - it prevents name@123.com type emails from registering
  const validEmail = (emailId) => /^[^\s@]+@[^\s@\d]+\.[^\s@]+$/.test(emailId);

  // This hook is used for deciding which page to render after login
  useEffect(() => {
    const nextPage = auth.onAuthStateChanged((user) => {
      if (user) {
        // fetching current user datas from cloud firestore
        const docRef = db.collection('users').doc(auth.currentUser?.email);
        docRef.get().then((doc) => {
          // if user has informations already then they will be taken to the routine page directly
          if (doc.exists) {
            navigation.replace('CustomRoutine');
          } else { // if it's a new user then they should fill the quiz first
            navigation.replace('Hair Quiz');
          }
        });
      }
    });
    return nextPage;
  }, []);

  // callback function for new user registration
  const handleRegistration = () => {
    // checks if the email is valid or not
    // for valid email user creating an user in firebase auth
    validEmail(emailId) ? (auth
      .createUserWithEmailAndPassword(emailId, password)
      .then(() => {
        console.log('Registered Successfully!');
      })
      // if there's any error , an alert is shown with error message
      .catch((err) => alert(err.message)))
      // If email isn't valid then showing an 
      : alert("Please provide a valid email."); 
  };

  // callback function for existing users
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        console.log('Logged in Successfully!');
      })
      .catch((err) => alert(err.message));
  };

  return (
    // A view containing two text input boxes and two buttons
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Email"
          value={emailId}
          onChangeText={(txt) => setEmailId(txt)}
          style={styles.textInput}
        />
        {/* As this text input field is for password, so I am using secureTextEntry prop to hide password text */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(txt) => setPassword(txt)}
          style={styles.textInput}
          secureTextEntry 
        />
      </View>
      {/* Button container */}
      <View style={styles.buttonContainer}>
        {/* Buttons should be pressable, so TouchableOpacity is used */}
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegistration}
          // Two styles are added because this button has different design than previous one
          style={[styles.button, styles.registerButton]}> 
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserAuthenticationScreen;

const styles = StyleSheet.create({
  // the main view is centering every child element along with plum colored background
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'plum',
  },
  // taking 80% width of the main view for textInput boxes
  textInputContainer: {
    width: '80%',
  },
  // style for the texts of textInput area
  textInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  // style for login button background
  button: {
    backgroundColor: 'mediumorchid',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  // style for texts of login button
  buttonText: {
    color: 'white',
    letterSpacing: 2,
    fontWeight: 'bold',
    fontSize: 20,
  },
  // style for the view of two buttons
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '30%',
    marginVertical: 20,
  },
  // different background & border color for register button
  registerButton: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'mediumorchid',
    borderWidth: 2,
  },
  // different text color for register button
  registerBtnText: {
    color: 'mediumorchid',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

/** This login page is implemented by following an youtube video.
 *  video tutorial link : https://youtu.be/ql4J6SpLXZA
 *  date accessed : 19th February, 2023
 */
