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
    height: 415,
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

  containerTotalValue: {

    backgroundColor: '#fafaf9',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position:'absolute',
    bottom: 10,
    right: 10,
    left:10
  },
  
  receivedValueContainer:{ 

    justifyContent: 'space-between',
    alignItems: 'center',
  },

  receivedValueText: {

    fontSize: 16,
    fontWeight: 'bold',
  },

  receivedValueInput: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 60,
    width: 90,

    fontSize: 16,
    fontWeight: 'bold',
  },

  totalValueContainer:{ 

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  totalValueTitle: {

    fontSize: 16,
    fontWeight: 'bold',

  },

  totalValue: {

    backgroundColor: 'white',
    borderRadius: 5,
    height: 60,
    width: 90,
    fontSize: 18,
    fontWeight: 'bold',
  },

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