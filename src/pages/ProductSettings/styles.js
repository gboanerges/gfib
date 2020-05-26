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

    backgroundColor: '#fafafa',
    borderRadius: 12,
    height: 600,
  },

  productTag: {

    flexDirection: "row",
    justifyContent: 'space-evenly',
    padding: 12,
  },

  productTagText: {

    flexDirection: "row",
    justifyContent: 'space-around',
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 150,
  },

  productList: {

    padding: 12,
    
  },

  product: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 10,
    marginBottom: 10,
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

    // position: 'absolute',
    // bottom: 0,
    // left: 20,
    // right: 20,
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