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

    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#Eb0519',
    borderRadius: 6,
    padding: 6,
  },

  reportSearchDay: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#Eb0519',
    borderRadius: 6,
    padding: 6,
    marginBottom: 8,
    width: '100%',

  },

  reportDate: {
    textAlign: 'center',
    fontSize: 16,
    padding: 8,
    minWidth: '86%',
  },

  reportCalendar: {

    
  },

  selectMonth: {

    width: '100%',
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

  // Modal 
  modal: {

    flex: 1,
    maxHeight: '50%',

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

  // END Modal
});