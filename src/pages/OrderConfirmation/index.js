import React, { useState, useEffect } from 'react';
import { Button, View, Text, FlatList, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

import { ButtonGroup } from 'react-native-elements';

export default function OrderConfirmation() {

  // Select with clients available
  const [selectValue, setSelectValue] = useState('Cliente');
  const selectPlaceholder = {

    label: 'Cliente',
    value: 'Cliente',
  }

  const [amountReceived, onChangeAmountReceived] = React.useState(0);

  const route = useRoute();
  const productParams = route.params.qtd;
  const totalParams = route.params.total;
  const clientList = route.params.clients;

  const [order, setOrder] = useState([]);
  const [clients, setClients] = useState([]);
  const [total, setTotal] = useState(0);

  function loadData(){

    let prod = productParams.filter(produto => produto.qtd > 0);
    setOrder(prod);
    setTotal(String(totalParams));
    setClients(clientList);
  }

  useEffect (() => {

    loadData();
  }, [])

  const buttons = ['R$', 'CC', 'FIADO' ];

  const [paymentIndex, setPaymentIndex] = useState(0);

  function paymentButton(index){

    setPaymentIndex(index);
  }

  function confirmMsgs(title, msg){

    Alert.alert(
      title,
      msg,
      [
        { 
          text: "OK",
        }
      ],
      { cancelable: false }
    );
  }

  async function confirmOrder(){

    // setting constants to match attributes of table order
    const receivedValue = parseFloat(amountReceived.replace(',','.').replace(' ',''));
    const client = selectValue;
    const paymentType = buttons[paymentIndex];
    const value = total; 

    const debt = total - receivedValue;

    // Map only product name and quant
    const productMap = productParams.map((product) => {
      return (
        {name: product.name, quantity:product.qtd}
      ) 
    });

    // Transform into String to save in db
    const products = JSON.stringify(productMap);
    
    if(client === 'Cliente'){

      if( debt > 0){

        confirmMsgs('Valor recebido:', 'Valor recebido precisa ser igual ao total correto'
        +'\nSelecione o cliente na lista');

      }else if(debt < 0){
          
        confirmMsgs('Valor recebido a Mais:', 'Valor recebido EXCEDE o total da compra');
      }
      else{

        if(paymentType != 'FIADO' ){

          await api.post('orders', {

            products,
            value,
            paymentType,
            receivedValue,
            client
          });
         
          navigateToHome();
          confirmMsgs('', 'Compra realizada com sucesso!');

        }else {

          confirmMsgs('Tipo de Pagamento Errado', 'Selecione R$ ou CC.');
          
        }
      }
    }

    else{
      
      console.log('Nome do comprador ===', selectValue);

      // Total <= receivedValue
      if( debt <= 0){
        
        confirmMsgs('Valor recebido Incorreto!', 'Não há débito. Selecione a opção: Cliente');
        console.log('Não há débito. Selecione a opção: Cliente');
      }
      
      // Total > received
      else{

        if(paymentType != 'FIADO'){

          console.log('Selecione o Tipo de Pagamento FIADO');
          confirmMsgs('Tipo de Pagamento Incorreto!', 'Selecione a opção: FIADO');

        }else {

          await api.post('orders', {

            products,
            value,
            paymentType,
            receivedValue,
            client
          });

          navigateToHome();
          confirmMsgs('', 'Compra realizada com sucesso!');

        }
      }
    }
    
  }

  const confirmButtonAlert = () =>
    Alert.alert(
      "Confirmar Compra",
      "Deseja confirmar a compra?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { 
          text: "SIM",
          
          onPress: confirmOrder
        }
      ],
      { cancelable: false }
    );

  const navigation = useNavigation();

  function navigateToHome(){

    navigation.navigate('Home'); 
  }

  function navigateBack(){

    navigation.goBack(); 
  }

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 32 }}>
          LOGO {buttons[paymentIndex]}
        </Text>
        
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={32} color="#EB5757"/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.containerConfirm}>

        <RNPickerSelect
          style={styles.selectClient}
          placeholder={selectPlaceholder}
          onValueChange={(itemValue, itemIndex) => setSelectValue(itemValue)}
          items={
            
            clients.map((client) => {
              return (

                {label: client.name, value:client.name, itemKey: client.id}
              ) 
            })
          }
        />

        <View style={styles.itemsContainer}>
          <View style={styles.itemsTags}>
            <Text>
              Produto(s){selectValue}
            </Text>

            <Text>
              Quantidade
            </Text>

            <Text>
              Valor
            </Text>
          </View>

          <FlatList 
            style={styles.productList}
            data={order}
            keyExtractor={order => String(order.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: order }) => (

              <View style={styles.itemsList}>
                <Text>
                  {order.name}
                </Text>
                
                <Text>
                  {order.qtd}
                </Text>
                
                <Text>
                  {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL', 
                }).format(order.price*order.qtd)}
                </Text>
              </View>
            )}>
          </FlatList>
          <Text>
            valor recebido teste ---
           {amountReceived}

          </Text>
        </View>

        <ButtonGroup
          buttons={buttons}
          selectedButtonStyle={{ backgroundColor: '#98DA44' }}
          selectedIndex={paymentIndex}
          onPress={paymentButton}
        />

        <View style={styles.containerTotalValue}>
          
          <View style={styles.receivedValueContainer}>

            <Text style={styles.receivedValueText}>
              Valor Recebido
            </Text>
            
            <View style={styles.receivedValueInput}>

              <Text style={styles.receivedValueText}>
                R$
              </Text>
              <TextInput
                style={styles.receivedValueText}
                keyboardType={'numeric'}
                onChangeText={text => onChangeAmountReceived(text)}
                placeholder={'0.0'}
              />
            </View>
          </View>

          <View style={styles.totalValueContainer}>

            <Text style={styles.totalValueTitle}>
              Valor Total
            </Text>
                
            <TextInput
              style={styles.totalValue}
              value={Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL', 
                }).format(total)}
              editable={false}
            />
            
          </View>
        </View>
      </View>
    
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.eraseButton} onPress={navigateToHome}>
          <Text style={styles.orderButtons}>
            Cancelar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={confirmButtonAlert}>
          <Text style={styles.orderButtons}>
            Finalizar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}