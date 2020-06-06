import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

import Modal from 'react-native-modal';

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

  const [totalCash, setTotalCash] = useState({

    value: 0,
    formatedValue: 'R$0,00'
  });

  const [totalCard, setTotalCard] = useState({

    value: 0,
    formatedValue: 'R$0,00'
  });

  function loadData(){

    let prod = productParams.filter(produto => produto.qtd > 0);
    setOrder(prod);
    setTotal(String(totalParams));
    //setClients(clientList);
  }

  useEffect (() => {

    loadData();
  }, [])

  const buttons = ['R$', 'CC', 'FIADO' ];

  const [paymentIndex, setPaymentIndex] = useState(0);

  function paymentButton(index){

    setPaymentIndex(index);
  }

  function payment(type) {

    const parsedCash = parseFloat(String(totalCash.value).replace(',','.').replace(' ',''));
    const parsedCard = parseFloat(String(totalCard.value).replace(',','.').replace(' ',''));
    
    console.log('totalCAsh', totalCash);
    console.log('totalCard', totalCard);
    console.log(total);

    if(type == 'cash'){

      console.log('if cash');

      if(totalCard.value == 0){
        console.log('if totalCard');

        setTotalCash({
          
          value: total,
          formatedValue: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total),

        });

      }else if(totalCard.value < total) {
        console.log('else cash');
        
        const amountLeft = total - totalCard.value;
        console.log(amountLeft);

        setTotalCash({
        
          value: amountLeft,
          formatedValue: Intl.NumberFormat('pt-BR', {
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
          formatedValue: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total),

        });

      }else {
        console.log('\nelse card');

        if(totalCash.value < total){

          console.log('total cash', totalCash.value);

          const amountLeft = total - totalCash.value;
          console.log('amount', amountLeft);

          setTotalCard({
          
            value: amountLeft,
            formatedValue: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(amountLeft),
  
          });
        }
      }
    }
  }

  function formatIntl(value){

    const formatedValue = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    return formatedValue;
  }

  function handleInputCard(event) {
    
    const parsedCard = parseFloat(event.nativeEvent.text.replace(',','.').replace(' ',''));
    console.log('inputCard valor', parsedCard);
    console.log('inputCard', isNaN(parsedCard));

    // Sets total card values only if the given input value is number
    if(!isNaN(parsedCard)){

      setTotalCard({
        
        ...totalCard,
        formatedValue: formatIntl(parsedCard),
      })
    }else {
      setTotalCard({
        
        value: 0,
        formatedValue: formatIntl(0),
      })
    }
  }

  function handleInputCash(event) {
    
    const parsedCash = parseFloat(event.nativeEvent.text.replace(',','.').replace(' ',''));
   
    if(!isNaN(parsedCash)){

      setTotalCash({
        
        ...totalCash,
        formatedValue: formatIntl(parsedCash),
      })
    } else {
      setTotalCash({
        
        value: 0,
        formatedValue: formatIntl(0),
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

  const [clientName, onChangeClientName] = useState('');

  // Modal usage
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [newClient, setNewClient] = useState(0);

  // Add new client on db
  async function modalConfirm(){

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

  useEffect(() => {

    api.get('clients').then(response => (setClients(response.data)));

  }, [newClient]);

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 32 }}>
          LOGO
        </Text>
        
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={32} color="#EB5757"/>
        </TouchableOpacity>
      </View>
      
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
                value: 'Cliente',
                color: 'red',}
              }
              value={selectValue}
              useNativeAndroidPickerStyle={false}
              onValueChange={(itemValue, itemIndex) => setSelectValue(itemValue)}
              items={
                
                clients.map((client) => {
                  return (
                    
                    {label: client.name, value:client.name, itemKey: client.id}
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
              <Feather name="plus" size={32} color="#EB5757"/>
            </TouchableOpacity>
        </View>

        <View style={styles.itemsContainer}>
          <View style={styles.itemsTags}>
            <Text>
              Produto(s)
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

          <View style={styles.totalOrderContainer}>

            <Text style={styles.totalOrderText}>
              Total da compra:
            </Text>

            <Text style={styles.totalOrderValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(total)}
            </Text>
          </View>
        </View>
        
        <Text>

          {selectValue}
        </Text>
        {/* <ButtonGroup
          buttons={buttons}
          selectedButtonStyle={{ backgroundColor: '#98DA44' }}
          selectedIndex={paymentIndex}
          onPress={paymentButton}
        /> */}



        <View style={styles.containerPayment}>

          <Text style={{ fontWeight: 'bold', fontSize: 22 ,textAlign: 'center' }}>
            Pagamento
          </Text>

          <View style={styles.paymentCash}>

            <TouchableOpacity onPress={() => payment('cash')}>
              <Text style={styles.paymentTitleText}>
                Dinheiro
              </Text>
            </TouchableOpacity>

            <TextInput
              id="cashInput"
              style={styles.paymentInput}
              keyboardType={'numeric'}

              onTouchStart={() => setTotalCash({
                value: '' , formatedValue: ''
              })}

              onEndEditing={handleInputCash}

              onChangeText={text => setTotalCash({
                value: text,
                formatedValue: text,
              })}
              value={String(totalCash.formatedValue)}
            />  

            <TouchableOpacity 
              onPress={() => setTotalCash({
                value: 0, formatedValue: formatIntl(0)
            })}>

              <Feather style={styles.paymentErase} name="x-circle" size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.paymentCard}>

            <TouchableOpacity onPress={() => payment('card')}>
              <Text style={styles.paymentTitleText}>
                Cartão
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.paymentInput}

              onTouchStart={() => setTotalCard({
                value: '' , formatedValue: ''
              })}

              onEndEditing={handleInputCard}

              onChangeText={text => setTotalCard({
                value: text,
                formatedValue: text,
              })}
              keyboardType={'numeric'}
              value={String(totalCard.formatedValue)}
            />

            <TouchableOpacity 
              onPress={() => setTotalCard({
                value: 0, formatedValue: formatIntl(0)
            })}>

              <Feather style={styles.paymentErase} name="x-circle" size={25} />
            </TouchableOpacity>
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

            <TouchableOpacity style={styles.modalConfirm} onPress={modalConfirm}>
              <Text style={styles.modalButtonsText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#EB5757',
    borderRadius: 8,
    color: 'red',
    fontWeight: 'bold',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});