import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

/** A component to render an animated modal */
const CustomModal = ({visible, onClose, modalData}) => {
  return (
    // Modal Ui design
    <Modal animationType='slide' transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.modalHeaderView}>
          <Text style={styles.modalHeading}>Quick Haircare Tips</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalCloseBtn}>X</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.modalText}>{modalData}</Text>
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender',
    borderColor: 'orchid',
    borderWidth: 5,
    marginVertical: '55%',
    marginHorizontal: '10%',
    borderRadius: 20,
    elevation: 10
  },
  modalHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalCloseBtn: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
  },
  modalText: {
    fontSize: 16, 
    fontWeight: '500',
    marginHorizontal: '10%',
  }
});
