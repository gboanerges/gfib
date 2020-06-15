import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
export default StyleSheet.create({
  
  container:{

    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight + 16,
  },
  
  header: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {

    marginTop: 8,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  clientContainer: {

    flex: 1,
    backgroundColor: '#fafafa',
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
    height: '78%',
  },

  clientTags: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },

  client: {

    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#faa',
    marginTop: 8,
    borderRadius: 6,
  },

  clientName: {

    fontSize: 16,
    fontWeight: 'bold',
    color: '#737380',
    marginHorizontal: 6,
    minWidth: 80,
    maxWidth: 80,

  },

  clientDebt: {

    fontSize: 16,
    fontWeight: 'bold',
    color: '#737380',
    maxWidth: 80,
    minWidth: 80,

  },

  clientButton: {

    marginHorizontal: 6,
  },
  
  // Modal 
  modal: {

    flex: 1,
    maxHeight: 180,

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

    padding: 8,
    borderRadius: 8,
    height: '8%',
  },

  eraseButton: {

    padding: 8,
    borderRadius: 6,
    backgroundColor: '#EB5757',
  },
  
  confirmButton: {

    padding: 8,
    borderRadius: 6,
    backgroundColor: '#00CF00',
  },

  buttonText: {

    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // End Button Styles
});