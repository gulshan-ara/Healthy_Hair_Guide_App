import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// a simple function to make the first letter of any string uppercase
const capitalLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const Profile = ({route}) => {
  // reading and storing params passed while navigating to this page.
  const {name, issues, userInfo} = route.params;
  return (
    <View style={styles.container}>
      <Image source={require('../assets/rapunzel.jpg')} style={styles.img}/>
      <Text style={styles.userName}>{name}</Text>
      <View style={styles.featuresContainer}>
        {/* The blank space is set delibaretly to show all texts aligned vertically */}
        <Text style={styles.featuresText}>
          Scalp type :      {capitalLetter(userInfo.scalpType)}
        </Text>
        <Text style={styles.featuresText}>
          Hair type :        {capitalLetter(userInfo.hairType)}
        </Text>
        <Text style={styles.featuresText}>
          Hair Density :   {capitalLetter(userInfo.hairDensity)}
        </Text>
        <Text style={styles.featuresText}>
          Hair Porosity :  {capitalLetter(userInfo.hairPorosity)}
        </Text>
        <Text style={styles.featuresText}>
          Hair Elasticity : {capitalLetter(userInfo.hairElasticity)}
        </Text>
        <Text style={[styles.featuresText, {letterSpacing: 0, color: 'blueviolet'}]}>
          Hair Concerns :    {issues.join(', ')}
        </Text>
      </View>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'plum',
    flex: 1
  },
  img: {
    height: 200,
    width: '60%',
    marginHorizontal: '20%',
    marginTop: '15%',
    borderRadius: 30
  },
  userName: {
    fontSize: 30, 
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10
  },
  featuresContainer: {
    backgroundColor: 'white',
    elevation: 12,
    borderRadius: 20,
    marginHorizontal: 30,
    marginVertical: 10,
    padding: '5%',
  },
  featuresText: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1
  }
});

/** An 'Edit Profile' button with some functionality will be developed here in future. */