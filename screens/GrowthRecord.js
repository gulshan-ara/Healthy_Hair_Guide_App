import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import {auth, db} from '../firebase'

// function for formatting date in a selected pattern
const formatDate = (date) => {
  let year = date.getFullYear();
  // month count starts at 0. so adding 1 to match with the pattern 
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);
  // date is shown as 2023-03-05 format
  return `${year}-${month}-${day}`;
}

const GrowthRecord = () => {
  // states for handling new and previous records
  const [hairLen, setHairLen] = useState('')
  const [density, setDensity] = useState('')
  const [growthRecords, setGrowthRecords] = useState([])
  const [recordsLen, setRecordsLen] = useState(0)

  // modal texts
  const lengthMeasurement = "Hold the starting point of tape at the hairline and stretch the tape at the back and see where your hair ends.";
  const densityMeasurement = "Make a tight ponytail and measure the diameter of it.";

  // Fetching data from database
  useEffect(() => {
    const fetchData = async () => {
      const docRef = db.collection('users').doc(auth.currentUser?.email);
      await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setGrowthRecords(doc.data().growth);
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    };
    fetchData();
  }, []);

  // updating the length of growth field
  useEffect(() => {
    setRecordsLen(growthRecords.length);
  }, [growthRecords]);

  // function for adding the new record in database.
  const handleAddRecord = async () => {
    const date = new Date();

    // an empty array which will later be used for updating growth records
    let updatedRecords = [];
    // adding all previously added growth record info in the empty array.
    {growthRecords.map((item) => {
      updatedRecords.push({
        'hairlength' : item.hairlength,
        'density': item.density,
        'date' : item.date,
        'id' : item.id
      });
    })}

    // now adding the new growth records in the end of the existing records array
    updatedRecords[recordsLen] = {
      'hairlength': hairLen,
      'density': density,
      'date': formatDate(date),
      'id': recordsLen
    }

    // now updating the updated records array in database using the update method of firebase
    db.collection('users')
        .doc(auth.currentUser?.email)
        .update(
          {growth: updatedRecords},
          setGrowthRecords(updatedRecords),
          setRecordsLen(recordsLen+1),
          setHairLen(''),
          setDensity('')
        )
        .then(() => {     
          alert("New record added successfully!");
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.addNoteContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={styles.addNoteText}
            placeholder="Add new hair length"
            onChangeText={newText => setHairLen(newText)}
          />
          <TouchableOpacity style={styles.modalIconContainer} onPress={() => alert(lengthMeasurement)}>
            <Text style={styles.modalIcon}>?</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={styles.addNoteText}
            placeholder="Add new hair density"
            onChangeText={newText => setDensity(newText)}
          />
          <TouchableOpacity style={styles.modalIconContainer} onPress={() => alert(densityMeasurement)}>
            <Text style={styles.modalIcon}>?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAddRecord} style={styles.addNoteButton}>
          <Text style={styles.addBtnText}>Add Record</Text>
        </TouchableOpacity>
      </View>
      {recordsLen > 0 ? growthRecords.map((note) => (
        <View key={note.id} style={styles.addNoteContainer}>
          <Text style={styles.noteHeading}>{note.date}</Text>
          <Text style={styles.addNoteText}>Hair lenghth : {note.hairlength}</Text>
          <Text style={styles.addNoteText}>Hair Density : {note.density}</Text>
        </View>)):
        (<View style={styles.addNoteContainer}>
          <Text style={[styles.noteHeading, {textAlign: 'center'}]}>No Records Added Yet😢</Text>
        </View>)
      }
    </ScrollView>
  )
}

export default GrowthRecord

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'plum',
    height: '100%'
  }, 
  addNoteContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 5,
    borderRadius: 10,
    elevation: 12
  },
  modalIconContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: 15, 
    height: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'black'
  },
  modalIcon : {
    fontWeight: 'bold',
    fontSize: 10,
    color: 'white'
  },
  addNoteText: {
    marginBottom: 5,
    fontSize: 16, 
    fontWeight: '500',
    padding: 5
  },
  addNoteButton: {
    backgroundColor: 'mediumorchid',
    width: '40%',
    paddingHorizontal: 5,
    paddingVertical:10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: '30%',
    marginVertical: 5,
  },
  addBtnText: {
    color: 'white',
    letterSpacing: 2,
    fontWeight: 'bold',
    fontSize: 16,
  },
  noteHeading: {
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold'
  }
});
