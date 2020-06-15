import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

//import logoImage from '../../assets/logo.png';

import styles from './styles';

export default function Home() {

  const navigation = useNavigation();

  function navigateTo(option){

    switch (option) {
      case '1':

        navigation.navigate('Order');
        break;
      case '2':

        navigation.navigate('ClientArea');
        break;

      case '3':

        navigation.navigate('ProductSettings');
        break;

      case '4':

        navigation.navigate('Report');
        break;

    }
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>

        <Text style={styles.logo}>
          GFIB LOGO
        </Text>
      </View>

      <View style={styles.buttonsContainer}>

        <TouchableOpacity style={[styles.homeButtons, { marginTop: 0}]} onPress={() => navigateTo('1')}>
          <Text style={styles.homeButtonsText}>
            Iniciar Venda
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButtons} onPress={() => navigateTo('2')}>
          <Text style={styles.homeButtonsText}>
            Área de Clientes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButtons} onPress={() => navigateTo('3')}>
          <Text style={styles.homeButtonsText}>
            Produtos
          </Text>
        </TouchableOpacity>
            
        <TouchableOpacity style={styles.homeButtons} onPress={() => navigateTo('4')}>
          <Text style={styles.homeButtonsText}>
            Relatórios
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}