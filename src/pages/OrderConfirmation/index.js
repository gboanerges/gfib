import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, SafeAreaView, View, Text, FlatList, Alert, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

import Modal from 'react-native-modal';
import PageHeader from '../../components/PageHeader';

export default function OrderConfirmation() {

  const [selectValue, setSelectValue] = useState(0);

  const route = useRoute();
  const productParams = route.params.qtd;
  const totalParams = route.params.total;

  const [order, setOrder] = useState([]);
  const [clients, setClients] = useState([]);
  const [total, setTotal] = useState(0);

  const [totalCash, setTotalCash] = useState({

    value: 0,
    formattedValue: 'R$0,00'
  });

  const [totalCard, setTotalCard] = useState({

    value: 0,
    formattedValue: 'R$0,00'
  });

  function loadData(){

    let prod = productParams.filter(produto => produto.qtd > 0);
    setOrder(prod);
    setTotal(String(totalParams));
  }

  useEffect (() => {

    loadData();
  }, [])

  function paymentButtons(type) {

    console.log('payment buttons', type);

    if(type == 'cash'){

      if(totalCard.value == 0){

        setTotalCash({
          
          value: total,
          formattedValue: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total),

        });

      }else if(totalCard.value < total) {
        
        const amountLeft = total - totalCard.value;
        console.log('CASH amountLeft', amountLeft);

        setTotalCash({
        
          value: amountLeft,
          formattedValue: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amountLeft),

        });
        
      }
    }
    else if (type == 'card'){

      if(totalCash.value == 0){

        setTotalCard({
          
          value: total,
          formattedValue: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total),

        });

      }else {

        if(totalCash.value < total){

          const amountLeft = total - totalCash.value;
          console.log('CARD amountLeft', amountLeft);
          setTotalCard({
          
            value: amountLeft,
            formattedValue: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(amountLeft),
  
          });
        }
      }
    }
  }

  function formatIntl(value){

    const formattedValue = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    return formattedValue;
  }

  function handleInputCard(event) {
    
    const parsedCard = parseFloat(event.nativeEvent.text.replace(',','.').replace(' ',''));
    console.log('handle input card', parsedCard);
    // Sets total card values only if the given input value is number
    if(!isNaN(parsedCard)){

      setTotalCard({
        
        value: parsedCard,
        formattedValue: formatIntl(parsedCard),
      })
    }else {
      setTotalCard({
        
        value: 0,
        formattedValue: formatIntl(0),
      })
    }
  }

  function handleInputCash(event) {
    
    const parsedCash = parseFloat(event.nativeEvent.text.replace(',','.').replace(' ',''));
   
    if(!isNaN(parsedCash)){

      setTotalCash({
        
        value: parsedCash,
        formattedValue: formatIntl(parsedCash),
      })
    } else {
      setTotalCash({
        
        value: 0,
        formattedValue: formatIntl(0),
      })
    }
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
  
  function alertClientOrder (clientData) {

    Alert.alert(
      `Pagamento ${clientData.paymentType}`,
      "Confirmar a compra?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { 
          text: "SIM",
          
          onPress: () => confirmClientOrder(clientData)
        }
      ],
      { cancelable: false }
    );
  }

  async function confirmClientOrder(clientData) {

    await api.post('orders', clientData);

    navigateToHome();
    confirmMsgs('', 'Compra realizada com sucesso!');
  }

  async function confirmOrder(){

    // setting constants to match attributes of table order
    const cashValue = totalCash.value;
    const cardValue = totalCard.value;
    const totalValue = total; 

    const receivedValue = Number(cardValue) + Number(cashValue);

    const client = selectValue;

    let paymentType = '';

    const types = {

      lessThanTotal: 'MENOR',
      greaterThanTotal: 'MAIOR',
      full: 'TOTAL',
      zero: 'NULO'
    };

    let paymentMode = '';

    const payments = {

      cash: 'DINHEIRO',
      card: 'CARTÃO',
      cashCard: 'DINHEIRO/CARTÃO',
      zero: 'FIADO'
    };

    /*
      Checks values of cash and card inputs,
      to set the correct paymentMode
    */
    if(Number(cashValue) == 0 && Number(cardValue) == 0) {

      paymentMode = payments.zero;
    }  
    else if(Number(cashValue) > 0) {

      if (Number(cardValue) > 0) {

        paymentMode = payments.cashCard;

      }else{

        paymentMode = payments.cash;
      }
    } 
    
    else if (Number(cardValue) > 0) {

      if (Number(cashValue) > 0) {

        paymentMode = payments.cashCard;

      }else{

        paymentMode = payments.card;

      }
    }

    const debtOrder = totalValue - receivedValue;
    // Map only product name and quant
    const productMap = productParams.map((product) => {
      return (
        {name: product.name, quantity:product.qtd}
      ) 
    });

    // Transform products JSON into String to save in db
    const products = JSON.stringify(productMap);
    
    // Normal client selected, standard procedure 
    if(client == 0){

      if( debtOrder > 0){

        confirmMsgs('Dinheiro recebido a menos:', 'Valor recebido, dinheiro/cartão precisa ser igual ao total'
        +'\nSelecione o cliente na lista');

      }else if(debtOrder < 0){
          
        confirmMsgs('Valor recebido a Mais:', 'Valor recebido EXCEDE o total da compra');
      }
      else{

          await api.post('orders', {

            products,
            paymentType: types.full,
            paymentMode,
            cashValue,
            cardValue,
            totalValue,
            client,
          });
         
          navigateToHome();
          confirmMsgs('', 'Compra realizada com sucesso!');
      }
    }

    else{
      
       // Received value equals ZERO, unpaid order
      if(debtOrder == totalValue){

        paymentType = types.zero; 
      }

      // Received Value LESS than Total
      else if(debtOrder > 0) {

        paymentType = types.lessThanTotal; 
      }

      // Received Value GREATER than Total
      else if (debtOrder < 0){

        paymentType = types.greaterThanTotal; 
      }

      // Debt value equals zero, totally paid order
      else {

        paymentType = types.full; 
      }

      const clientData = {

        products,
        paymentType,
        paymentMode,
        cashValue,
        cardValue,
        totalValue,
        client,
      };

      alertClientOrder(clientData);
    }
  }

  const confirmOrderButton = () =>
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

  const [clientName, onChangeClientName] = useState('');

  // Modal usage
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [newClient, setNewClient] = useState(0);

  // Add new client on db
  async function modalAddClient(){

    onChangeClientName('');

    if(clientName == ''){
      
      Alert.alert(
        "Erro ao cadastrar cliente",
        "Digite algum nome para o cliente",
        [
          { 
            text: "OK",
            
            onPress: () => {}
          }
        ],
        { cancelable: false }
      );
    }
    else{

      await api.post('clients', {clientName});
      
      setModalVisible(!isModalVisible);
      setNewClient(newClient + 1);
    }
  }

  // Reloading client list after add new one
  useEffect(() => {

    api.get('clients').then(response => (setClients(response.data)));

  }, [newClient]);

  return (
    
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.select({
        ios: 'padding',
        android: 'height',
    })}
    >

      <View style={styles.container}>
        
        <PageHeader />
        
        <View style={styles.containerConfirm}>

          <View style={styles.selectContainer}>

            <View style={styles.select}>

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
                  label: 'Cliente',
                  value: '0',
                  color: 'red',}
                }
                useNativeAndroidPickerStyle={false}
                onValueChange={(itemValue, itemIndex) => setSelectValue(itemValue)}
                items={
                  
                  clients.map((client) => {
                    return (
                      
                      {label: client.name, value:client.id, itemKey: client.id}
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

              <TouchableOpacity style={styles.addClient} onPress={toggleModal}>
                <Feather name="plus" size={28} color="#EB5757"/>
              </TouchableOpacity>
          </View>

          <View style={styles.itemsContainer}>
            <View style={styles.itemsTags}>
              <Text style={{ minWidth: 110}}>
                Produto(s)
              </Text>

              <Text>
                Quant
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
                  <Text style={styles.itemsListName}>
                    {order.name}
                  </Text>
                  
                  <Text style={styles.itemsListQuant}>
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

            <View style={styles.totalOrderContainer}>

              <Text style={styles.totalOrderText}>
                Total da compra:
              </Text>

              <Text style={styles.totalOrderText}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(total)}
              </Text>
            </View>
          </View>

          <View style={styles.containerPayment}>

            <Text style={styles.paymentTitle}>
              Pagamento
            </Text>

            <View style={styles.paymentCash}>

              <TouchableOpacity onPress={() => paymentButtons('cash')}>
                <Text style={styles.paymentTitleText}>
                  Dinheiro
                </Text>
              </TouchableOpacity>

              <TextInput
                id="cashInput"
                style={styles.paymentInput}
                keyboardType={'numeric'}

                onTouchStart={() => setTotalCash({
                  value: '' , formattedValue: ''
                })}

                onEndEditing={handleInputCash}

                onChangeText={text => setTotalCash({
                  value: text,
                  formattedValue: text,
                })}
                value={String(totalCash.formattedValue)}
              />  

              <TouchableOpacity 
                onPress={() => setTotalCash({
                  value: 0, formattedValue: formatIntl(0)
              })}>

                <Feather style={styles.paymentErase} name="x-circle" size={25} />
              </TouchableOpacity>
            </View>

            <View style={styles.paymentCard}>

              <TouchableOpacity onPress={() => paymentButtons('card')}>
                <Text style={styles.paymentTitleText}>
                  Cartão
                </Text>
              </TouchableOpacity>

              <TextInput
                style={styles.paymentInput}

                onTouchStart={() => setTotalCard({
                  value: 0 , formattedValue: ''
                })}

                onEndEditing={handleInputCard}

                onChangeText={text => setTotalCard({
                  value: text,
                  formattedValue: text,
                })}
                keyboardType={'numeric'}
                value={String(totalCard.formattedValue)}
              />

              <TouchableOpacity 
                onPress={() => setTotalCard({
                  value: 0, formattedValue: formatIntl(0)
              })}>

                <Feather style={styles.paymentErase} name="x-circle" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      
        <View style={styles.buttonContainer}>
          
            <TouchableOpacity style={[styles.confirmButton,
            {
              backgroundColor: '#aaafff' ,
            }]} onPress={navigateBack}>
              <Text style={styles.orderButtons}>
                Voltar
              </Text>
            </TouchableOpacity>

          <TouchableOpacity style={styles.eraseButton} onPress={navigateToHome}>
            <Text style={styles.orderButtons}>
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={confirmOrderButton}>
            <Text style={styles.orderButtons}>
              Finalizar
            </Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>

            <Text style={styles.modalTitle}>Cadastro de Cliente</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Nome do Cliente"
              onChangeText={text => onChangeClientName(text)}  
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancel} onPress={toggleModal}>
                <Text style={styles.modalButtonsText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalConfirm} onPress={modalAddClient}>
                <Text style={styles.modalButtonsText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#EB5757',
    borderRadius: 8,
    color: 'red',
    fontWeight: 'bold',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});