import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
export default StyleSheet.create({
  
  container:{

    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  
  logo: {
    
    fontSize: 32,

  },

  buttonContainer: {
    
    marginTop: 360,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
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
    fontSize: 16,
  },
});