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

  // Product Styles
  productContainer: {

    flex: 1,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    height: '78%',
  },

  productTag: {

    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 8,
  },

  productTagText: {

    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },

  productList: {

    padding: 8,
    
  },

  product: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#ebaeaa',
  },

  productName: {

    fontSize: 16,
    fontWeight: 'bold',
    color: '#626161',
    
    minWidth: 75,
    maxWidth: 75,
  },

  productPriceText: {

    fontSize: 16,
    fontWeight: 'bold',
    color: '#626161',
  },

  
  productUpdate: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#ebaeab',
  },
  // End Product Styles

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
    fontSize: 16,
    fontWeight: 'bold',
  },
  // End Button Styles

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

    backgroundColor: '#FFBF00',
    borderRadius: 12,
    padding: 8,
  },

  modalDelete: {

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
});