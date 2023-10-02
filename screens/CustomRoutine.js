import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import {routineForNonStraightHair, dailyTasksForNonStraightHair, dailyTasksForStraightHair, highElasticityCare, notLowPorous, splitEnds_breakage_Care, washdayTasks, greyingAdvice, baldness, drynessAndFrizzCare, dandruffCare} from '../staticData/tasksData';
import { lowElasticityCare } from '../staticData/tasksData';
import { lowPorousThinHair } from '../staticData/tasksData';
import CustomCalendar from '../components/Calendar';

// a simple function to make the first letter of any string uppercase
const capitalLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** There's 4 icons in the footer of this page. This custom component represents
 * one icon. It contains a pressable image and text and navigates to relevant page.
 */
const FooterIcon = ({imagePath, label, handlePress}) => {
  return (
    <TouchableOpacity style={styles.footerIconContainer} onPress={handlePress}>
      <Image source={imagePath} style={styles.footerImage}></Image>
      <Text style={styles.footerLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const CustomRoutine = () => {
  //  some states to save and update user data.
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState('');
  const [issues, setUserIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [latestDate, setLatestDate] = useState(new Date());

  // some variables to identify user hair type. These will be used to show routine later
  const isStraight = userInfo.hairType === 'straight' ? true : false;
  const isSplitEnds = issues.includes('splitEnds') || issues.includes('hairBreakage');
  const isLowElastic = userInfo.hairElasticity === 'low' ? true : false;
  const isHighElastic = userInfo.hairElasticity === 'high' ? true : false;
  const isLowPorousThinHair = userInfo.hairPorosity === 'low' && userInfo.hairDensity === 'thin' ? true : false; 
  const isDrynFrizzy = issues.includes('dryness') || issues.includes('frizz');
  const isDandruff = issues.includes('dandruff'); 
  const oilRecommendation = isLowPorousThinHair ? lowPorousThinHair : notLowPorous;
  const scalpType = userInfo.scalpType;
  const isHairfall = issues.includes('hairFall');
  const isBaldness = issues.includes('baldness');
  const isGreying = issues.includes('greying');

  // function to handle press on sign out icon
  const handleSignOut = () => {
    auth
      .signOut()
      .then(navigation.replace('Authentication'))
      .catch((error) => alert(error.message));
  };

  /** This hook is used for fetching data from database. */
  useEffect(() => {
    const fetchData = async () => {
      const docRef = db.collection('users').doc(auth.currentUser?.email);
      await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            //  fetching all types of data from database and storing them
            setUserInfo(doc.data().hairFeatures);
            setName(doc.data().name);
            setUserIssues(doc.data().userIssues);
            setIsLoading(false);
            setStartDate(doc.data().startDate);
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    };
    fetchData();

    return () => {
      fetchData();
    };
  }, []);

  /** This hook is used for updating the tasks everyday. */
  useEffect(() => {
    const interval = setInterval(() => {
      setLatestDate(new Date());
    }, 86400000);
    return () => clearInterval(interval);
  }, []);

  /** Washday frequency is different for all. here based on user answers,
   * checking what's the difference between each washday of user.
   */
  const washdayInterVal = (scalpType, isHairfall) => {
    let interval = 3;
    if(scalpType == 'oily'){
      interval = 2;
    }else if(scalpType == 'dry' && !isHairfall){
      interval = 5;
    }else if(scalpType == 'dry' && isHairfall){
      interval = 4;
    }
    return interval;
  }

  /** This function decides which task list will be shown in the task container. 
   * Here two conditions are checked. Is the current date an washday? if yes, show
   * task for washday. Otherwise, check the user has straight hair or not and render
   * the daily tasks based on that.
   */
  const taskSelection = () => {
    const startingdate = (new Date(startDate.seconds*1000 + startDate.nanoseconds/1000000));
    const difference = Math.floor((latestDate.getTime() - startingdate.getTime())/86400000);
    const interval = washdayInterVal(scalpType, isHairfall);
    const taskList = difference % interval === 0 ? washdayTasks : (isStraight ? dailyTasksForStraightHair : dailyTasksForNonStraightHair);
    return taskList;
  } 
  const tasks =  taskSelection();

  /** Rendering an activity indicator while data is fetched from database */
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

  return (
    /** In the UI only the task container, calendar and oil recommendation is
     * fixed to be shown with user specific data. Rest all cards will be shown 
     * only if relevant topic is chosen or answered by user from the hair quiz. 
     * thus many many boolean checking here.
    */
    <SafeAreaView>
      {/* Footer part isn't included in scrollview */}
      <ScrollView style={styles.container}>
        <View style={styles.hairScoreContainer}>
          {/* User's name is shown */}
          <Text style={styles.hairScoreText}>{name}'s Hair Routine</Text>
        </View>
        <View style={styles.taskContainer}>
          {/* Task list */}
          <Text style={styles.taskHeading}>Today's Task of Haircare -</Text>
          {tasks.map((item) => (
            <View key={item.id}>
              <Text style={styles.taskText}>{item.id}. {item.task}</Text>
            </View>
          ))}
          {/* Washday Calendar */}
          <Text style={[styles.taskHeading, {marginTop: 5}]}>Upcoming Washdays</Text>
          <CustomCalendar startDate={startDate} interval={washdayInterVal(scalpType, isHairfall)}/>
        </View>
        {/* Wavy/Curly/Coily hair styling routine */}
        {!isStraight && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeading}>{capitalLetter(userInfo.hairType)} Hair Routine</Text>
            <Text style={styles.cardContent}>{routineForNonStraightHair}</Text>
          </View>
        )}
        {/* Oil recommendation card */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardHeading}>Oil Recommendation </Text>
          <Text style={styles.cardContent}>{oilRecommendation}</Text>
        </View>
        {/* checking if user needs this content and rendering */}
        {isDrynFrizzy && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeading}>Care for Dry & Frizzy Hair</Text>
            <Text style={styles.cardContent}>{drynessAndFrizzCare}</Text>
          </View>
        )}
        {isDandruff && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeading}>Care for Dandruff</Text>
            <Text style={styles.cardContent}>{dandruffCare}</Text>
          </View>
        )}
        {isGreying && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeading}>Preventing Grey Hair</Text>
            <Text style={styles.cardContent}>{greyingAdvice}</Text>
          </View>
        )}
        {isBaldness && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeading}>Advice for Baldness</Text>
            <Text style={styles.cardContent}>{baldness}</Text>
          </View>
        )}
        {isSplitEnds && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeading}>Split-ends & Breakage care</Text>
            <Text style={styles.cardContent}>{splitEnds_breakage_Care}</Text>
          </View>
        )}
        {isLowElastic && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeading}>Care for less elastic hair</Text>
            <Text style={styles.cardContent}>{lowElasticityCare}</Text>
          </View>
        )}
        {isHighElastic && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardHeading}>Care for high elastic hair</Text>
            <Text style={styles.cardContent}>{highElasticityCare}</Text>
          </View>
        )}
      </ScrollView>
      {/* A sticky Footer bar containing 4 icons with relevant navigation. */}
      <View style={{flexDirection: 'row', backgroundColor: 'orchid', height: '12%'}}>
        <FooterIcon imagePath={require('../assets/profile.png')} label='Profile' handlePress={() => {navigation.navigate("Profile", {name, userInfo, issues})}}/>
        <FooterIcon imagePath={require('../assets/growth.png')} label='Growth' handlePress={() => {navigation.navigate("Growth Record")}}/>
        <FooterIcon imagePath={require('../assets/notes.jpeg')} label='Notes' handlePress={()=> {navigation.navigate("Hair Journal")}}/>
        <FooterIcon imagePath={require('../assets/sign-out.png')} label='Sign Out' handlePress={handleSignOut}/>
      </View>
    </SafeAreaView>
  );
};

export default CustomRoutine;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'plum',
    height: '88%',
  },
  hairScoreContainer: {
    elevation: 12,
    marginHorizontal: 20,
  },
  hairScoreText: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: '2%',
    letterSpacing: 1,
    textAlign: 'center',
  },
  taskContainer: {
    backgroundColor: 'white',
    elevation: 12,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: '5%',
  },
  taskHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  taskText : {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 5
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
  cardContainer: {
    backgroundColor: 'white',
    marginHorizontal: '5%',
    marginVertical: '2%',
    borderRadius: 12,
    elevation: 20,
    borderColor: 'orchid',
    borderWidth: 2,
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  cardHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  cardContent: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left'
  },
  footerIconContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  footerImage: {
    width: 34, 
    height: 34,
    borderRadius: 5,
  },
  footerLabel:{
    color:'white', 
    fontWeight: '700', 
    fontSize: 14
  }
});
