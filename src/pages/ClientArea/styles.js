import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
export default StyleSheet.create({
  
  container:{

    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  
  header: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  clientContainer: {

    backgroundColor: '#fafafa',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
    maxHeight: 500,
  },

  clientList: {


  },

  client: {

    flexDirection: 'row',
    justifyContent: 'space-between', 
    padding: 4,
    backgroundColor: '#C0BFBF',
    marginTop: 8,
    borderRadius: 6,
  },

  clientName: {

    fontSize: 16,
    fontWeight: 'bold',
    color: '#737380',
    marginHorizontal: 6,
  },
  
  clientButton: {

    marginHorizontal: 6,
  },
  
  // Modal 
  modal: {

    flex: 1,
    maxHeight: 220,

    borderRadius: 12,
    backgroundColor: 'white',
    padding: 16,
  },

  modalTitle: {
    
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalInput: {

    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    padding: 6,
    marginBottom: 12,
  },

  modalButtons: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,

    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
  },

  modalConfirm: {

    backgroundColor: 'green',
    borderRadius: 12,
    padding: 8,
  },

  modalCancel: {

    backgroundColor: 'red',
    borderRadius: 12,
    padding: 8,
  },

  modalButtonsText: {

    color: '#fafafa',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // END Modal

  // Button Styles
  buttonContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 16,
    borderRadius: 8,

    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },

  eraseButton: {

    padding: 10,
    borderRadius: 6,
    backgroundColor: '#EB5757',
  },
  
  confirmButton: {

    padding: 10,
    borderRadius: 6,
    backgroundColor: '#00CF00',
  },

  buttonText: {

    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // End Button Styles
});