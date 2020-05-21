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

  reportTitle: {

    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
  },

  reportContainer: {

    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 6,
    marginTop: 12,
  },

  warningOrder: {

    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  summaryTitle: {

    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  reportSearch: {

    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#affafa',
    borderRadius: 6,
    padding: 6,
  },

  reportDate: {

    textAlign: 'center',
    width: 280,
    fontSize: 16,
    padding: 10,
  },

  reportCalendar: {

    position: 'absolute',
    right: 5
  },

  reportSummary: {

    backgroundColor: '#fee',
    marginTop: 16,
    padding: 16,
    height: 500,
  },

  reportTotal: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eb012342',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },

  reportReceived: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',

  },

  order:{

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
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