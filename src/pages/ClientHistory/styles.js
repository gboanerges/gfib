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

  title: {

    marginTop: 16,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  clientContainer: {

    backgroundColor: '#fafafa',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
    minHeight: 590,
    maxHeight: 590,
  },
  
  clientList: {
    borderWidth: 1,
    flex: 1,
    height: '50%',
    padding: 4,
  },

  clientTags: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
  },
  
  clientName: {

    backgroundColor: '#ebaaaa',
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 6,
  },

  clientDebt: {

    backgroundColor: '#ebaaaa',
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 6,
  },

  order: {

    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#faa',
    marginTop: 4,
    borderRadius: 6,
  },

  orderDate: {

    fontSize: 16,
    fontWeight: 'bold',
    color: '#737380',
    marginHorizontal: 6,
    minWidth: 80,
    maxWidth: 80,

  },

  orderValue: {

    fontSize: 16,
    fontWeight: 'bold',
    color: '#737380',
    minWidth: 70,
    maxWidth: 70,

  },
  
  unpaidTags: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    padding: 6,
  },

  unpaidTagsText: {
    
    fontSize: 16,
    fontWeight: 'bold',
    color: '#737380',
    
  },
  
  warningOrder: {

    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Modal 
  modal: {

    flex: 1,
    maxHeight: '48%',

    borderRadius: 12,
    backgroundColor: 'white',
    padding: 8,
  },

  modalTitle: {
    
    fontSize: 18,
    fontWeight: 'bold',
    
    textAlign: 'center',
    marginBottom: 8,
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

  
  // payment Container
  containerPayment: {

    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  
  paymentCash:{ 

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 80,
  },

  paymentCard:{ 

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 80,

  },

  paymentTitleText: {

    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    
    backgroundColor: '#eb5432',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },

  paymentErase: {

    color: 'red',
  },

  paymentInput:{ 

    padding: 10,
    marginHorizontal: 6,
    backgroundColor: 'white',
    textAlign: 'center',
    minWidth: 80,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },

  // Button Styles
  buttonContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 16,
    borderRadius: 8,
    height: '8%',
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