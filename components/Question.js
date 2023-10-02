import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const QuestionView = ({ label, options, value, onValueChange, modalText }) => {
  return (
    <View style={styles.container}>
      {/* Question text container view */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{label}</Text>
        {/* Modal view */}
        <TouchableOpacity onPress={() => alert(modalText)}>
          <View style={styles.modalIconConatainer}>
            <Text style={styles.modalIcon}>?</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Radio buttons for answer options */}
      {options.map((option) => (
        <View key={option.value} style={styles.optionView}>
          <RadioButton
            value={option.value}
            status={option.value === value ? 'checked' : 'unchecked'}
            onPress={() => onValueChange(option.value)}
            color="plum"
          />
          {/* Option text */}
          <Text style={styles.optionText}>{option.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default QuestionView;

const styles = StyleSheet.create({
  container : {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flex: 1
  },
  question : {
    fontSize: 18,
    fontWeight: '800',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalIconConatainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: 20, 
    height: 20,
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'black'
  },
  modalIcon : {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  },
  optionView : {
    flexDirection: 'row'
  },
  optionText : {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 5,
    marginTop: 5
  }
});
