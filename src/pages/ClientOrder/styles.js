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

  clientOrderContainer: {

    flex: 1,
    height: '78%',
    
    backgroundColor: '#fafafa',
    shadowColor: 'black',
    borderColor: '#ea0000',
    borderWidth: 1.5,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  
  clientOrderData: {
    
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    
    color: '#fff',
    backgroundColor: '#ea0000',
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },

  orderInfoContainer: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '6%',
    marginVertical: 8,
    padding: 4,
  },

  orderInfoTag: {

    fontSize: 16,
    fontWeight: 'bold',
    minWidth: '70%',
  },
  
  orderInfoText: {

    minWidth: '25%',
    
    fontSize: 16,
    textAlign: 'center',
  },

  productList: {

    flex: 1,
    paddingHorizontal: 4, 
    borderWidth: 1,
  },
  
  productContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    padding: 4,
    borderRadius: 11,
    borderWidth: 1,
  },

  productTag: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginBottom: 8, 
  },
  
  productTextName: {

    fontSize: 16,
    minWidth: '60%',
  },

  productTextQuant: {

    fontSize: 16,
    minWidth: '7%',
    textAlign: 'center',
  },

  productTextPrice: {

    fontSize: 16,
    minWidth: '23%',
    textAlign: 'right',
    paddingRight: '2%',
  },

  productDebt: {

    fontSize: 18,
    minWidth: '23%',
    textAlign: 'center',
    borderWidth: 1,
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

  confirmButton: {

    padding: 10,
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