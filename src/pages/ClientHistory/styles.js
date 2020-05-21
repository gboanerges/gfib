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

  totalContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',

  },

  productList:{

    marginTop: 32,
  },

  product:{

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 24,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },

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