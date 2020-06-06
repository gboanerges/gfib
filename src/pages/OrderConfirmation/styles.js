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

  selectContainer: {

    flexDirection: 'row',
    alignItems: 'center'
  },

  select: {

    width: 300,
  },

  addClient: {

    position: 'absolute',
    right: 5,
  },

  selectClient:{

    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },

  totalOrderContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
  },
  
  totalOrderText: {

    
    fontSize: 20,
    fontWeight: 'bold',
  }, 
  
  totalOrderValue: {

     
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'black', 
    padding: 4,
  },

  totalContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',

  },
 
  containerConfirm: {

    flex: 1,
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
  },

  // Items 
  itemsContainer: {

    marginTop: 16,
    padding: 16,
    height: 350,
  },

  itemsTags: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemsList: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
    padding: 14,
  },


  // payment Container
  containerPayment: {

    backgroundColor: '#fafaf9',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,

    position:'absolute',
    bottom: 10,
    right: 10,
    left:10
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
   // Button styles
   buttonContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 12,
    borderRadius: 8,
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