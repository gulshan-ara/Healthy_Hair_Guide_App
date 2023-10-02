import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import CheckBoxItem from '../components/CheckBox';
import { QuestionData } from '../staticData/questionData';
import QuestionView from '../components/Question';

const CustomHome = () => {
  const navigation = useNavigation();
  // store the email of registered user for saving in database
  const email = auth.currentUser?.email;
  // defining the states
  const [name, setName] = useState('');
  // states for identifying users hair concerns which will be selected via checkboxes
  const [hairFall, setHairFall] = useState(false);
  const [hairBreakage, setHairBreakage] = useState(false);
  const [dryness, setDryness] = useState(false);
  const [frizz, setFrizz] = useState(false);
  const [dandruff, setDandruff] = useState(false);
  const [splitEnds, setSplitEnds] = useState(false);
  const [greying, setGreying] = useState(false);
  const [baldness, setBaldness] = useState(false);
  // a hair features object state to identify user's hair features.
  const [hairFeatures, setHairFeatures] = useState({
    scalpType: null,
    hairType: null,
    hairDensity: null,
    hairPorosity: null,
    hairElasticity: null,
  });

  // An object for getting the string values of hair features object's properties.
  const allIssues = {
    hairFall: hairFall,
    hairBreakage: hairBreakage,
    dryness: dryness,
    splitEnds: splitEnds,
    frizz: frizz,
    dandruff: dandruff,
    greying: greying,
    baldness: baldness
  };

  /** Let's check which hair issues are selected by the user.
   * The Object.keys returns an array of the keys of allIssues object.
   * Next I'm checking if the value attached with a key is true or not.
   * if it's true, then store the key
   * in userIssues array.
   */
  const userIssues = Object.keys(allIssues).filter((key) => allIssues[key]);

  /**  This function updates the hair features answers selected by user.
   * here when an answer is being changed, only that answer is getting
   * updated of hairFeatures object. Other answers are untouched.
   */
  const handleAnswerChange = (question, answer) => {
    setHairFeatures({ ...hairFeatures, [question]: answer });
  };

  /** Here I'm checking if the user answered all questions or not.
   * Object.values() returning an array of the answers.
   * Using the some method, I'm checking if there's any null value.
   * handleNull is a boolean variable which'll be used for further checking
   * in next step.
   */
  const handleNull = Object.values(hairFeatures).some(
    (value) => value === null
  );

  // Function to define actions as a response of submit button
  const handleSubmit = () => {
    // check if any field is remained unanswered
    if (name === '' || userIssues === [] || handleNull) {
      // throw alert to notify user to answer all questions.
      alert('Please provide all informations!');
    }
    // Write the answers in database for future usage
    else {
      /**  here creating a collection named 'users' and setting the email
       * as the id of user informations. This makes retrieving data from database
       * easier. Once id is set, let's write the answers in database field.
       */
      db.collection('users')
        .doc(auth.currentUser?.email)
        .set({
          name: name,
          email: email,
          userIssues: userIssues,
          hairFeatures: hairFeatures,
          startDate: new Date(),
          notes: [],
          growth: []
        })
        /** Data is written in database. Now taking the user to the custom routine page. */
        .then(() => {
          navigation.replace('CustomRoutine');
        })
        /** Checking if any error occured while writing data, if yes, then show the error
         * message in console.
         */
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  };

  // Let's design the UI.
  return (
    /** So here I'm preferring a scrollable view containing some
     * subsections so that user can see everything at once. */
    <ScrollView style={styles.container}>
      {/* The first subsection is for recieving username. So this part is designed
        with a Text asking for name following by TextInput field for writing the name.*/}
      <View style={styles.nameView}>
        <Text style={styles.question}>What would you like to be called?</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.nameText}
        />
      </View>
      {/* Now I want to know the concerns of user so that I can design a customised routine. 
        So Here's some checkboxes which represents the hair issues. The checkbox is a custom
        component handling the state by it's own. */}
      <View style={styles.nameView}>
        <Text style={[styles.question, { marginBottom: 10 }]}>
          What's your hair concerns?
        </Text>
        <CheckBoxItem
          label="Hair Fall"
          value={hairFall}
          setValue={setHairFall}
        />
        <CheckBoxItem
          label="Hair Breakage"
          value={hairBreakage}
          setValue={setHairBreakage}
        />
        <CheckBoxItem label="Dryness" value={dryness} setValue={setDryness} />
        <CheckBoxItem label="Frizz" value={frizz} setValue={setFrizz} />
        <CheckBoxItem
          label="Split Ends"
          value={splitEnds}
          setValue={setSplitEnds}
        />
        <CheckBoxItem
          label="Dandruff"
          value={dandruff}
          setValue={setDandruff}
        />
        <CheckBoxItem
          label="Grey hair"
          value={greying}
          setValue={setGreying}
        />
        <CheckBoxItem
          label="Baldness"
          value={baldness}
          setValue={setBaldness}
        />
      </View>
      {/* Now I'm asking some questions to get an idea of the hairfeatures of the user. 
        For this, I preferred using radio buttons. onSelecting the answer the state of the
        hairfeatures objects updates and the component rerenders with the latest selection
        
        As this was a repetating part, So I simply iterated over the questionData for minimizing
        the repetative codeblocks. */}
      <View>
        {QuestionData.map((question) => (
          <QuestionView
            key={question.id}
            label={question.label}
            options={question.options}
            value={hairFeatures[question.id]}
            onValueChange={(answer) => handleAnswerChange(question.id, answer)}
            modalText={question.modalText}
          />
        ))}
      </View>
      {/* Finally I am presenting a submit button to the user which will connect 
        the UI with database. */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'plum',
  },
  button: {
    backgroundColor: 'mediumorchid',
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: '30%',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    letterSpacing: 2,
    fontWeight: 'bold',
    fontSize: 20,
  },
  nameView: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: '800',
  },
  nameText: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'normal',
  },
});
