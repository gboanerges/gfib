import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Modal from 'react-native-modal';
import {Calendar, LocaleConfig } from 'react-native-calendars';

import RNPickerSelect from 'react-native-picker-select';

import Moment from 'moment';

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';

import styles from './styles';

export default function Report() {

  LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
    today: 'Hoje'
  };
  LocaleConfig.defaultLocale = 'br';

  const [date, setDate] = useState(new Date());
  const [previousDate, setPreviousDate] = useState('');
  const [currentYear, setCurrentYear] = useState(0);
  // Modal Add new product
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {

    setModalVisible(!isModalVisible);
  };

  function changeData (dateString) {

    toggleModal();

    setSelectValueMonth(0);
    setIsMonthChanged(0);

    setIsDateChanged(isDateChanged + 1);
    
    setDate(dateString);
    getReport(dateString);
 
    // Checks if the selected date exists in the object of marked dates
    // to add the selected attribute or remove if already selected
    if (dateString != previousDate) {
      
      if(daysWithOrders[dateString]){

        previousDate != '' ? daysWithOrders[previousDate].selected = false : null;
        
        const selectedDay = daysWithOrders[dateString];

        selectedDay.selectedColor = 'blue';
        selectedDay.selected = true;
      } 
      
      else {

        previousDate != '' ? daysWithOrders[previousDate].selected = false : null;

        setDaysWithOrders(prevState => {

          return { ...prevState, [dateString]: {selected: true, selectedColor: 'blue'},}
        });
      }
    } 
    
    setPreviousDate(dateString);

  }

  function getReport(date){

    const purchaseByDay = orders.filter(order => Moment(order.created_at, 'YYYY-MM-DD').format('YYYY-MM-DD') == Moment(date).format('YYYY-MM-DD'));
    
    setTotalOrder(sumObject(purchaseByDay, 'totalValue', ''));
    setTotalCash(sumObject(purchaseByDay, 'cashValue', ''));
    setTotalCredit(sumObject(purchaseByDay, 'cardValue', ''));
    setTotalUnpaid(sumObject(purchaseByDay, 'totalValue', 'FIADO'));

    if(purchaseByDay.length > 0){
    
      purchaseByDay.forEach((order) => {
        // Fix for warning json parse
        if(order.products != null){

        const produtos = JSON.parse(order.products);

        produtos.forEach(prod =>{
          
          order[prod.name] = prod.quantity;
        });

        delete order.products;
        }
      });
    }

    setReportOrders(purchaseByDay);

  }

  function onChangeMonth(monthValue) {

    const year = new Date().getFullYear()
    setSelectValueMonth(monthValue);
    setIsDateChanged(0);
    setIsMonthChanged(isMonthChanged + 1);
    if(monthValue != 0){

      console.log(monthValue +'/'+ year);
    }
    getMonthReport(monthValue);
  }

  function getMonthReport(month){

    if(month > 0){
      
      const purchaseByMonth = orders.filter(order => Moment(order.created_at, 'YYYY-MM-DD').format('MM') == Moment(month, 'MM').format('MM'));
    
      setTotalOrder(sumObject(purchaseByMonth, 'totalValue', ''));
      setTotalCash(sumObject(purchaseByMonth, 'cashValue', ''));
      setTotalCredit(sumObject(purchaseByMonth, 'cardValue', ''));
      setTotalUnpaid(sumObject(purchaseByMonth, 'totalValue', 'FIADO'));

      if(purchaseByMonth.length > 0){
      
        purchaseByMonth.forEach((order) => {
          // Fix for warning json parse
          if(order.products != null){

          const produtos = JSON.parse(order.products);

          produtos.forEach(prod =>{
            
            order[prod.name] = prod.quantity;
          });

          delete order.products;
          }
        });
      }

      setReportOrders(purchaseByMonth);
    }
  }

  function sumObject (items, prop, type ){
    // A == 0 and b is the object, access prop passed
    return items.reduce( function(a, b){

        if(type === ''){   
          return a + b[prop];
        }
        
        else if(type === 'FIADO') {
          
          return b['paymentMode'] === type ? a + b[prop] : a;
        }

    }, 0);
  };

  async function createXlsx(){
    
    if(reportOrders.length > 0) {

      const dataCompra = Moment(date).format('DDMMYYYY');

      var ws = XLSX.utils.json_to_sheet(reportOrders);

      var wb = XLSX.utils.book_new();
      
      XLSX.utils.sheet_add_aoa(ws, [
        [" ", ' '],
        ["Valor Total", totalOrder],
        ["Valor Dinheiro", totalCash],
        ["Valor Cartão", totalCredit],
        ["Valor Fiado", totalUnpaid],
      ], {origin:-1});

      XLSX.utils.book_append_sheet(wb, ws, "GFIB_Tabela_" + Moment(date).format('DD-MM-YYYY'));

      const wbout = XLSX.write(wb, {
        type: 'base64',
        bookType: "xlsx"
      });

      const uri = FileSystem.cacheDirectory + 'gfib_tabela_'+ dataCompra + '.xlsx';
      
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64
      });

      await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'MyWater data',
        UTI: 'com.microsoft.excel.xlsx'
      });
    }
  }
  
  const navigation = useNavigation();

  function navigateToHome(){

    navigation.goBack(); 
  }

  const [orders, setOrders] = useState([]);
  const [reportOrders, setReportOrders] = useState([]);

  const [totalOrder, setTotalOrder] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalCash, setTotalCash] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);

  const [isDateChanged, setIsDateChanged] = useState(0);
  const [isMonthChanged, setIsMonthChanged] = useState(0);

  const [selectValueMonth, setSelectValueMonth] = useState(0);
  const [selectMonth, setSelectMonth] = useState([

    {
      name: 'Janeiro',
      number: '01',
    },
    {
      name: 'Fevereiro',
      number: '02',
    },
    {
      name: 'Março',
      number: '03',
    },
    {
      name: 'Abril',
      number: '04',
    },
    {
      name: 'Maio',
      number: '05',
    },
    {
      name: 'Junho',
      number: '06',
    },
    {
      name: 'Julho',
      number: '07',
    },
    {
      name: 'Agosto',
      number: '08',
    },
    {
      name: 'Setembro',
      number: '09',
    },
    {
      name: 'Outubro',
      number: '10',
    },
    {
      name: 'Novembro',
      number: '11',
    },
    {
      name: 'Dezembro',
      number: '12',
    },
  ]);

  const [daysWithOrders, setDaysWithOrders] = useState(
   {}
  );

  async function loadData(){

    const response = await api.get('orders');
    setOrders(response.data);
    
    // Setting days with orders to mark on the calendar    
    const orderedDays = response.data.map((order) => Moment(order.created_at, 'YYYY-MM-DD').format('YYYY-MM-DD'));

    orderedDays.forEach(day => {

      setDaysWithOrders(prevState => {

        return {...prevState, [day]: {marked: true, selectedColor: 'gray'} }
      });
    });
  }

  // Load orders from db
    useEffect (() => {
      
      //loadData();

   }, [])

  return (

    <View style={styles.container}>

      <PageHeader>
          Relatórios
      </PageHeader>

      <View style={styles.reportContainer}>

        <View style={styles.reportSearch}>

          <View style={styles.reportSearchDay}>

            <Text style={styles.reportDate}>
              { isDateChanged > 0 ? Moment(date).format('DD/MM/YYYY') : "Escolha uma Data"} 
            </Text>

            <TouchableOpacity style={styles.reportCalendar} onPress={toggleModal}>
              <Feather name="calendar" size={36} color="#EB5757"/>
            </TouchableOpacity>
          </View>

          <View style={styles.selectMonth}>
            <RNPickerSelect
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 20,
                  right: 10,
                },
                placeholder: {
                  color: '#EB5757',
                  fontSize: 16,
                  fontWeight: 'bold',
                },
              }}
              placeholder={{
                label: 'Selecione um mês',
                value: '0',
                color: 'red',}
              }
              useNativeAndroidPickerStyle={false}
              value={selectValueMonth}
              onValueChange={(itemValue, itemIndex) => onChangeMonth(itemValue)
              }
              items={
                
                selectMonth.map((month) => {

                  return (
                    {label: month.name, value:month.number, itemKey: month.number}
                    ) 
                  })
              }
              Icon={() => {
                return (
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      borderTopWidth: 10,
                      borderTopColor: '#EB5757',
                      borderRightWidth: 10,
                      borderRightColor: 'transparent',
                      borderLeftWidth: 10,
                      borderLeftColor: 'transparent',
                      width: 0,
                      height: 0,
                    }}
                  />
                );
              }}
            />
          </View>
        </View>
        
        <View style={styles.reportSummary}>
          
          { reportOrders.length > 0 ? 
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

          : isDateChanged > 0 || isMonthChanged > 0 ? 
            <Text style={styles.warningOrder}>
              Não há compras neste dia/mês!
            </Text> 
            
          : <Text style={styles.warningOrder}>
              Selecione uma Data ou Mês!
            </Text> }
          
        </View>
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.eraseButton} onPress={navigateToHome}>
          <Text style={styles.textButtons}>
            Voltar 
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={createXlsx}>
          <Text style={styles.textButtons}>
            Exportar
          </Text>
        </TouchableOpacity>
      </View>

      <Modal animationInTiming={800} animationOutTiming={600} isVisible={isModalVisible}>
                        
        <View style={styles.modal}>
        
          <Calendar 
            
            markedDates={daysWithOrders}
            onDayPress={(day) => changeData(day.dateString)}
          />
        </View>
      </Modal>
       
    </View>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#EB5757',
    borderRadius: 8,
    color: 'red',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});