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

  reportContainer: {
    
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 6,
    marginTop: 12,

    height: '85%',
  },

  reportTitle: {

    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
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
    borderWidth: 1.5,
    borderColor: '#Eb0519',
    borderRadius: 6,
    padding: 6,
  },

  reportDate: {

    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    padding: 10,
  },

  reportCalendar: {

    position: 'absolute',
    right: 5
  },

  reportSummary: {

    flex: 1,
    backgroundColor: '#fee',
    marginTop: 16,
    padding: 16,
    height: '100%',
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

  // Button styles
  buttonContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 12,
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

  textButtons: {

    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});