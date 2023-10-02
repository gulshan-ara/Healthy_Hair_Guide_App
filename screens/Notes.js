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

/** Here, I implemented a note taking feature, where once a note is added, it'll 
 * instantly show in the bottom part. And all notes added by the user in various times, will be
 * shown here. I struggled with updating the previously added notes the most. I was 
 * having difficulty to add the recent input in the correct place because i was unable to 
 * get the length of notes field from database somehow. Thus used an useEffect hook seperately, 
 * only to update the notes field length. 
 */

const Notes = () => {
  // states for handling text inputs and notes
  const [text, setText] = useState('')
  const [notes, setNotes] = useState([])
  const [notesLen, setNotesLen] = useState(0)

  // First I'm fetching previously added notes data from database.
  useEffect(() => {
    const fetchData = async () => {
      const docRef = db.collection('users').doc(auth.currentUser?.email);
      await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setNotes(doc.data().notes);
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

  // updating the length of notes fields
  useEffect(() => {
    setNotesLen(notes.length);
    // every time notes gets updated, this hook renders & updates the length
  }, [notes]);


  // function to handle new note input
  const handleAddNote = async () => {
    // date is stored for keeping track of the time, when the note is added.
    const date = new Date();

    // an empty array which will later be used for updating notes 
    let updatedNotes = [];
    // adding all previously added notes info in the empty array. 
    {notes.map((item) => {
      updatedNotes.push({
        'text' : item.text,
        'date' : item.date,
        'id' : item.id
      });
    })}

    // now adding the new note in the end of the existing notes array
    updatedNotes[notesLen] = {
      'text': text,
      'date': formatDate(date),
      'id': notesLen
    }

    // now updating the updated notes array in database using the update method of firebase
    db.collection('users')
        .doc(auth.currentUser?.email)
        .update(
          {notes: updatedNotes},  // updated the notes field in database
          setNotes(updatedNotes), // updated the notes state 
          setNotesLen(notesLen+1), // updated the notes length
          setText('')
        )
        .then(() => {     
          alert("New note added successfully!");
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
    });
  }

  // UI design
  return (
    <ScrollView style={styles.container}>
      <View style={styles.addNoteContainer}>
        {/* As a note can be multiliner, so setting multiline props as true. */}
        <TextInput
          style={styles.addNoteText}
          placeholder="Add new note"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
          multiline={true}
        />
        <TouchableOpacity onPress={handleAddNote} style={styles.addNoteButton}>
          <Text style={styles.addBtnText}>Add Note</Text>
        </TouchableOpacity>
      </View>
      {/* Here, First checked if there's any note in database, if yes then showed
      them, otherwise rendered a sorry text. */}
      {notesLen > 0 ? notes.map((note) => (
        <View key={note.id} style={styles.addNoteContainer}>
          <Text style={styles.noteHeading}>{note.date}</Text>
          <Text style={styles.addNoteText}>{note.text}</Text>
        </View>))
        :(<View style={styles.addNoteContainer}>
          <Text style={[styles.noteHeading, {textAlign: 'center'}]}>No Notes Added Yet😢</Text>
        </View>)
      }
    </ScrollView>
  )
}

export default Notes

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
