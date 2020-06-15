import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
export default StyleSheet.create({
  
  container:{

    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  
  logoContainer: {
    
    height: '60%',
    justifyContent: 'center',    
  },

  logo: {

    fontSize: 32,
    textAlign: 'center'
  },

  buttonsContainer: {

    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
  },

  homeButtons: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: 8,
    marginTop: 24,
  },

  homeButtonsText: {
    
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});