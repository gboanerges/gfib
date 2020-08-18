import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
export default StyleSheet.create({
  
  container:{

    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  
  containerConfirm: {

    flex: 1,
    marginTop: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,

    maxHeight: '90%',
    borderColor: 'black',
    borderWidth: 2
  },

  selectContainer: {

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '8%',
  },

  select: {

    width: '85%',
    marginRight: '1%',
  },

  addClient: {

    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal:6,
    paddingVertical:6,
  },

  totalOrderContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black', 
    padding: 4,
  },
  
  totalOrderText: {
    
    fontSize: 18,
    fontWeight: 'bold',
  }, 

  // Items 
  itemsContainer: {

    marginTop: 8,
    padding: 16,
    height: '60%',

    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2
  },

  itemsTags: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 4,
    borderColor: 'black',
    padding: 4,
    borderWidth: 1,
  },

  itemsList: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 6,
    padding: 4,

    borderRadius: 4,
    backgroundColor: '#abb'
  },

  itemsListName: {

    minWidth: 120,
  },
 
  // payment Container
  containerPayment: {

    padding: 8,
    
    height: '30%',
    marginVertical: '2%',

    borderRadius: 8,
  },

  paymentTitle: {

    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
   marginBottom: '1%'

  },

  paymentCash:{ 

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '40%',
    marginBottom: '1%'
  },

  paymentCard:{ 

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '40%',
  },

  paymentTitleText: {

    fontSize: 18,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    
    minWidth: 100,
    maxWidth: 100,
    
    backgroundColor: '#eb5432',
    color: '#fff',
    borderWidth: 0.6,
    borderColor: '#000',
    borderRadius: 4,
  },

  paymentErase: {

    color: 'red',
  },

  paymentInput:{ 

    padding: 8,
    marginHorizontal: 6,
    backgroundColor: 'white',
    textAlign: 'center',
    minWidth: 80,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },

  // Modal 
  modal: {

    flex: 1,
    maxHeight: '22%',

    borderRadius: 8,
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

   // Button styles
  buttonContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 12,
    height: '8%'
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

  orderButtons: {

    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

});