import React, { useState, useEffect } from 'react';
import { Button, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import Moment from 'moment';

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import api from '../../services/api';

import styles from './styles';

export default function Report() {

  const [date, setDate] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {

    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    
    getReport(currentDate);
  };

  const showMode = currentMode => {

    setShow(true);
    setMode(currentMode);
  };

  function getReport(data){

    const compra = orders.filter(order => order.created_at.split(' ', 1) == Moment(data).format('YYYY-MM-DD'));
    
    setOrdersByDay(compra);
    setTotalOrder(sumObject(compra, 'value', '', 'total'));
    setTotalReceived(sumObject(compra, 'receivedValue', '', 'totalRec'));
    setTotalCash(sumObject(compra, 'value', 'R$', 'cash'));
    setTotalCredit(sumObject(compra, 'value', 'CC', 'credit'));
    setTotalUnpaid(sumObject(compra, 'value', 'FIADO', 'unpaid'));
  }

  function sumObject (items, prop, type , func){
    // A == 0 and b is the object, access prop passed
    return items.reduce( function(a, b){

        if(type === ''){   

          return a + b[prop];
        }
        
        else if(type === 'R$') {
          
          return b['paymentType'] === type ? a + b[prop] : a;
        }

        else if(type === 'CC') {

          return b['paymentType'] === type ? a + b[prop] : a;
        }

        else if(type === 'FIADO') {
          
          return b['paymentType'] === type ? a + b[prop] : a;
        }

    }, 0);
  };

  const navigation = useNavigation();

  function navigateToHome(){

    navigation.goBack(); 
  }

  const [orders, setOrders] = useState([]);
  const [ordersByDay, setOrdersByDay] = useState([]);

  const [totalOrder, setTotalOrder] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalCash, setTotalCash] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);

  async function loadData(){

    const response = await api.get('orders');
    setOrders(response.data);
    getReport(date);
  }

  // Load orders from db
    useEffect (() => {

      loadData();

   }, [])

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={{ fontSize: 32 }}>
          LOGO
        </Text>
        
        <TouchableOpacity onPress={navigateToHome}>
          <Feather name="arrow-left" size={32} color="#EB5757"/>
        </TouchableOpacity>
      </View>

      <Text style={styles.reportTitle}>
        Relatórios
      </Text>

      <View style={styles.reportContainer}>

        <View style={styles.reportSearch}>
        
          <Text style={styles.reportDate}>
            {Moment(date).format('DD/MM/YYYY')}
          </Text>

          <TouchableOpacity style={styles.reportCalendar} onPress={showMode}>
            <Feather name="calendar" size={50} color="#EB5757"/>
          </TouchableOpacity>

        </View>
        
        <View style={styles.reportSummary}>
          
          { ordersByDay.length > 0 ? 
            <View>
              <Text style={styles.summaryTitle}>
                Sumário
              </Text>

              <View style={styles.reportTotal}>

                <Text style={styles.a}> 
                  Valor Total
                </Text>
              
                <Text style={styles.a}> 
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL', 
                  }).format(totalOrder)}
                </Text>
              </View>
    
              <View style={styles.reportTotal}>
                <Text style={styles.a}> 
                  Total Recebido
                </Text>
              
                <Text style={styles.a}> 
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL', 
                  }).format(totalReceived)}
                </Text>
              </View>

              <View style={styles.reportTotal}>
                <Text style={styles.a}> 
                  Total Dinheiro
                </Text>
              
                <Text style={styles.a}> 
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL', 
                  }).format(totalCash)}
                </Text>
              </View>

              <View style={styles.reportTotal}>
                <Text style={styles.a}> 
                  Total Cartão de Crédito
                </Text>
              
                <Text style={styles.a}> 
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL', 
                  }).format(totalCredit)}
                </Text>
              </View>

              <View style={styles.reportTotal}>
                <Text style={styles.a}> 
                  Total Fiado
                </Text>
              
                <Text style={styles.a}> 
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL', 
                  }).format(totalUnpaid)}
                </Text>
              </View>

            </View>

          : <Text style={styles.warningOrder}>
            Não há compras neste dia!
            </Text>}

          
        </View>
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.eraseButton} onPress={navigateToHome}>
          <Text style={styles.buttonText}>
            Voltar 
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={()=>{}}>
          <Text style={styles.buttonText}>
            Exportar
          </Text>
        </TouchableOpacity>
      </View>

      {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
    </View>


  );
}