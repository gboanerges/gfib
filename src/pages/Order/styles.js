import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
export default StyleSheet.create({
  
  container:{

    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  
  totalContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',

  },

  totalText: {

    fontSize: 16,
    fontWeight: 'bold',
  },

  productList:{

    marginTop: 16,
    backgroundColor: '#C0BFBF',
    padding: 12,
    borderRadius: 6,
  },

  product:{

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },

  productName: {

    fontSize: 20,
    fontWeight: 'bold',
    minWidth: 170,
  },

  productQuant: {

    backgroundColor: '#FDDADD',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    width: 50,
  },

  productQuantText: {

    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF5757',
  },

  productButtons: {

    borderColor: '#EF5757',
    borderWidth: 2,
    borderRadius: 8,
  },

  buttonContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 12,
    borderRadius: 8,
  },

  orderButtons: {

    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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
 
});