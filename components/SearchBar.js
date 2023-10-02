import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

/** This is simple component formed with a textinput. */
const SearchBar = ({value, setValue}) => {
  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Search'
        value={value}
        onChangeText={text => setValue(text)}
        style={styles.searchText}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container:{
    borderColor: 'orchid',
    borderWidth: 3,
    borderRadius: 5,
    marginHorizontal: '10%',
    marginVertical: '5%',
    backgroundColor: 'white',
    elevation: 12,
    height: 50,
  },
  searchText: {
    marginHorizontal: '5%',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  }
});

// This is added in components folder as this feature can be reused throughout the app. 
