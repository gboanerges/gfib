import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Modal from 'react-native-modal';

import api from '../../services/api';

import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';

export default function DatePick() {

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log('onChange', date);
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log('setDate', date);

  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 32 }}>
          LOGO
        </Text>
        
        <TouchableOpacity onPress={()=>{}}>
          <Feather name="arrow-left" size={32} color="#EB5757"/>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        DATEPICKER TESTE
      </Text>

      <View style={styles.productContainer}>

        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View>

        
        
      </View>
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.eraseButton} onPress={()=>{}}>
          <Text style={styles.buttonText}>
            Voltar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={()=>{}}>
          <Text style={styles.buttonText}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}