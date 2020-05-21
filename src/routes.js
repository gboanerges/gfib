import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Home from './pages/Home';
import Order from './pages/Order';
import ClientArea from './pages/ClientArea';
import ClientHistory from './pages/ClientHistory';
import ProductSettings from './pages/ProductSettings';
import Report from './pages/Report';
import OrderConfirmation from './pages/OrderConfirmation';

export default function Routes() {

  return(
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{ headerShown: false }}>

        <AppStack.Screen name="Home" component={Home}></AppStack.Screen>
        <AppStack.Screen name="Order" component={Order}></AppStack.Screen>
        <AppStack.Screen name="OrderConfirmation" component={OrderConfirmation}></AppStack.Screen>
        <AppStack.Screen name="ClientHistory" component={ClientHistory}></AppStack.Screen>
        <AppStack.Screen name="ClientArea" component={ClientArea}></AppStack.Screen>
        <AppStack.Screen name="ProductSettings" component={ProductSettings}></AppStack.Screen>
        <AppStack.Screen name="Report" component={Report}></AppStack.Screen>
        
      </AppStack.Navigator>
    </NavigationContainer>
  );
}