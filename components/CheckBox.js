import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import Checkbox from 'expo-checkbox'

// A component for rendering checkboxes with label.
const CheckBoxItem = ({ label, value, setValue }) => {
    const [isChecked, setIsChecked] = useState(value);
    
    // function to handle press on checkbox
    const handlePress = () => {
      setIsChecked(!isChecked);
      setValue(!isChecked);
    };
    
    // UI design
    return (
        <View style={styles.checklist}>
            <Checkbox
              style={styles.checkIcon}
              value={isChecked}
              onValueChange={handlePress}
              color={isChecked ? 'plum' : 'black'}
            />
            <Text style={styles.checkText}>{label}</Text>
        </View>
      );
    };


export default CheckBoxItem

const styles = StyleSheet.create({
    checklist: {
      marginTop: 5,
      flexDirection: 'row',
    },
    checkIcon: {
      marginHorizontal: 5,
    },
    checkText: {
      fontSize: 16,
      fontWeight: '500',
      paddingHorizontal: 5
    },
});
