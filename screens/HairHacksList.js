import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { dailyCare, washdayCare, growthHacks } from '../staticData/HairHacksData';
import CustomModal from '../components/CustomModal';

/** Here data are passed as params during navigation. So first I checked which 
 * data to show and set that as adviceList. 
 */
const HairHacksList = ({ route }) => {
  // a state to handle modal visibility
  const [modalData, setModalData] = useState(null);
  // function for opening modal
  const onModalPress = (data) => {
    setModalData(data);
  };
  // function for hiding modal
  const onCloseModal = () => {
    setModalData(null);
  };

  // reading the screen name passed as param while navigating
  const screenName = route.params;
  // setting the advice list according to screen name.
  let adviceList;
  if (screenName == 'Daily') {
    adviceList = dailyCare;
  } else if (screenName == 'Washday') {
    adviceList = washdayCare;
  } else {
    adviceList = growthHacks;
  }

  // UI design
  return (
    /** Here I am using map function to iterate over advicelist. and for 
     * every element in the list a view is shown containing an image & text.
     * Also the modal text is set on press
    */
    <ScrollView style={styles.container}>
      {adviceList.map((item) => (
        <TouchableOpacity
          onPress={() => onModalPress(item.modalText)}
          key={item.cardText}>
          <View style={styles.cardContainer}>
            <Image
              source={require('../assets/rapunzel.jpg')}
              style={{ height: 80, width: 80 }}
            />
            <Text style={styles.cardText}>{item.cardText}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {/* Modal is only visible when modalData is truthy. */}
      <CustomModal
        visible={!!modalData}
        onClose={onCloseModal}
        modalData={modalData}></CustomModal>
    </ScrollView>
  );
};

export default HairHacksList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'plum',
  },
  cardContainer: {
    marginHorizontal: '5%',
    marginVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: -5,
      height: -5,
    },
    shadowOpacity: 0.6,
    elevation: 12,
    flexDirection: 'row',
  },
  cardText: {
    flex: 5,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
    padding: 5,
  },
});
