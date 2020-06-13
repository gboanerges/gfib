import React, { useState, useEffect } from 'react';
import { Alert, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Modal from 'react-native-modal';
import Moment from 'moment';
import api from '../../services/api';

import styles from './styles';

export default function ClientHistory() {

  const navigation = useNavigation();

  function navigateClientArea(){

    navigation.navigate('ClientArea'); 
  } 
  
  // Modal usage
  const [isModalVisible, setModalVisible] = useState(false);
  function toggleModal() {

    setCashValue({ 

      value: 0, formatedValue: 'R$0,00',
    });

    setCardValue({ 

      value: 0, formatedValue: 'R$0,00',
    });

    setModalVisible(!isModalVisible);
  };

  function confirmPaymentAlert() {

    Alert.alert(
      "Confirmação de pagamento",
      "Deseja confirmar o pagamento desta compra?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { 
          text: "SIM",
          
          onPress: () => confirmPayment()
        }
      ],
      { cancelable: false }
    );
  }

  async function confirmPayment(){

    let paymentMode = '';

    const payments = {

      cash: 'DINHEIRO',
      card: 'CARTÃO',
      cashCard: 'DINHEIRO/CARTÃO',
      zero: 'FIADO'
    };

    if(Number(cashValue.value) == 0 && Number(cardValue.value) == 0) {

      paymentMode = payments.zero;
    }  
    else if(Number(cashValue.value) > 0) {

      if (Number(cardValue.value) > 0) {

        paymentMode = payments.cashCard;

      }else{

        paymentMode = payments.cash;
      }
    } 
    
    else if (Number(cardValue.value) > 0) {

      if (Number(cashValue.value) > 0) {

        paymentMode = payments.cashCard;

      }else{

        paymentMode = payments.card;

      }
    }

    const paymentData = {

      products: '[{\"name\":\"Coxinha\",\"quantity\":0},{\"name\":\"Croquete\",\"quantity\":0},{\"name\":\"Empada Frango\",\"quantity\":0},{\"name\":\"Empada Bacalhau\",\"quantity\":0},{\"name\":\"Esfiha Carne\",\"quantity\":0},{\"name\":\"Esfiha Frango\",\"quantity\":0},{\"name\":\"Pãozinho\",\"quantity\":0},{\"name\":\"Pastel Forno\",\"quantity\":0},{\"name\":\"Pastel Frito\",\"quantity\":0},{\"name\":\"Quibe\",\"quantity\":0},{\"name\":\"Risole\",\"quantity\":0},{\"name\":\"Saltenha\",\"quantity\":0},{\"name\":\"Tortalete\",\"quantity\":0},{\"name\":\"Torta Doce\",\"quantity\":0},{\"name\":\"Torta Salgada\",\"quantity\":0},{\"name\":\"Refris\",\"quantity\":0},{\"name\":\"Refri Coca\",\"quantity\":0},{\"name\":\"Água Mineral\",\"quantity\":0},{\"name\":\"Suco\",\"quantity\":0}]',
      totalValue: (Number(cashValue.value) + Number(cardValue.value)),
      cashValue: cashValue.value,
      cardValue: cardValue.value,
      client: clientId,
      paymentMode,
      paymentType: "DÍVIDA",
    };

    await api.post('orders', paymentData);

    setModalVisible(!isModalVisible);
    setUpdatePage(updatePage + 1);
  }

  const route = useRoute();
  const clientId = route.params.id;

  async function loadData(){

    const clientResponse = await api.get(`clients/${clientId}`);

    const orderResponse = await api.get(`orders/${clientId}`);
    
    setClientHistory(orderResponse.data);
    setClientName(clientResponse.data[0].name);
    setClientDebt(clientResponse.data[0].debt);
    
  }
  
  const [clientHistory, setClientHistory] = useState([]);

  // Dependency test for useEffect to load new product added
  const [updatePage, setUpdatePage] = useState(0);

  const [clientName, setClientName] = useState('');
  const [clientDebt, setClientDebt] = useState(0);

  const [cardValue, setCardValue] = useState({

    value: 0, formatedValue: 'R$0,00',
  });
  const [cashValue, setCashValue] = useState({

    value: 0, formatedValue: 'R$0,00',
  });

  function formatIntl(value){

    const formatedValue = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    return formatedValue;
  }

  function handleInputCard(event) {
    
    const parsedCard = parseFloat(event.nativeEvent.text.replace(',','.').replace(' ',''));

    // Sets total card values only if the given input value is number
    if(!isNaN(parsedCard)){

      setCardValue({
        
        value: parsedCard,
        formatedValue: formatIntl(parsedCard),
      })
    }else {
      setCardValue({
        
        value: 0,
        formatedValue: formatIntl(0),
      })
    }
  }

  function handleInputCash(event) {
    
    const parsedCash = parseFloat(event.nativeEvent.text.replace(',','.').replace(' ',''));
   
    if(!isNaN(parsedCash)){

      setCashValue({
        
        value: parsedCash,
        formatedValue: formatIntl(parsedCash),
      });
    } else {
      setCashValue({
        
        value: 0,
        formatedValue: formatIntl(0),
      });
    }
  }

  function paymentButtons(type) {

    const total = clientDebt;

    if(type == 'cash'){

      if(cardValue.value == 0){

        setCashValue({
          
          value: total,
          formatedValue: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total),

        });

      }else if(cardValue.value < total) {
        
        const amountLeft = total - cardValue.value;

        setCashValue({
        
          value: amountLeft,
          formatedValue: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amountLeft),

        });
        
      }
    }
    else if (type == 'card'){

      if(cashValue.value == 0){

        setCardValue({
          
          value: total,
          formatedValue: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total),

        });

      }else {

        if(cashValue.value < total){

          const amountLeft = total - cashValue.value;

          setCardValue({
          
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

  const [modalOrderVisible, setModalOrderVisible] = useState(false);

  function toggleOrderModal(){

    setModalOrderVisible(!modalOrderVisible);
  }

  // Load client orders from db
  useEffect (() => {

    loadData();
  }, [updatePage])

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={{ fontSize: 32 }}>
          LOGO
        </Text>
        
        <TouchableOpacity onPress={navigateClientArea}>
          <Feather name="arrow-left" size={32} color="#EB5757"/>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        Histórico  
      </Text>

      <View style={styles.clientContainer}>

        <View style={styles.clientTags}>

          <Text style={styles.clientName}>
            Cliente: {clientName}
          </Text>
          <Text style={styles.clientDebt}>
            Débito: {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(clientDebt)}
          </Text>

          <Text></Text>
        </View>
        
        { clientHistory.length > 0 ?
        
          <View style={{ flex:1 }}>
            <View style={styles.unpaidTags}>

              <Text style={[styles.unpaidTagsText]}>
                Data
              </Text>
              
              <Text style={styles.unpaidTagsText}>
                Valor Total
              </Text>

              <Text style={styles.unpaidTagsText}>
                Recebido
              </Text>

              <Text></Text>
            </View>
              
            <FlatList 
              style={[styles.clientList, { marginTop: 0 }]}
              data={clientHistory}
              keyExtractor={order => String(order.id)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: order }) => (

                <View style={styles.order}>

                  <Text style={styles.orderDate}>
                    {Moment(order.created_at, 'YYYY-MM-DD').format('DD/MM/YY')}

                  </Text>
                  <Text style={styles.orderValue}>
                    {Intl.NumberFormat('pt-BR', { 
                      style: 'currency',
                      currency: 'BRL',
                    }).format(order.totalValue)}
                  </Text>

                  <Text style={styles.orderValue}>
                    {Intl.NumberFormat('pt-BR', { 
                      style: 'currency',
                      currency: 'BRL',
                    }).format(order.cashValue + order.cardValue)}
                  </Text>

                  <TouchableOpacity style={[styles.clientButton, { backgroundColor: 'white'}]} onPress={toggleOrderModal}>
                    <Feather name="chevron-down" size={26} color="#EB5757"/>
                  </TouchableOpacity>

                  <Modal isVisible={modalOrderVisible}>
                    <View style={styles.modal}>
                      
                      <Text style={styles.modalTitle}>{order.created_at}</Text>

                      <Text style={styles.modalTitle}>{order.paymentType}</Text>

                      <Text style={styles.modalTitle}>{order.paymentMode}</Text>

                      <Text style={styles.modalTitle}>{order.cardValue}</Text>
                      

                      <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.modalCancel} onPress={toggleOrderModal}>
                          <Text style={styles.modalButtonsText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalConfirm} onPress={() => {}}>
                          <Text style={styles.modalButtonsText}>Confirmar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              )}
            />
          </View>

          : <Text style={styles.warningOrder}>Não há histórico de compras</Text> }

        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>

            <Text style={styles.modalTitle}>Pagamento</Text>

            <View style={styles.containerPayment}>

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

                  onTouchStart={() => setCashValue({
                    value: '' , formatedValue: ''
                  })}
    
                  onEndEditing={handleInputCash}
    
                  onChangeText={text => setCashValue({
                    value: text,
                    formatedValue: text,
                  })}
                  value={String(cashValue.formatedValue)}
                />  

                <TouchableOpacity onPress={() => setCashValue({
                  value: 0, formatedValue: formatIntl(0)
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
                  keyboardType={'numeric'}

                  onTouchStart={() => setCardValue({
                    value: '' , formatedValue: ''
                  })}
    
                  onEndEditing={handleInputCard}
    
                  onChangeText={text => setCardValue({
                    value: text,
                    formatedValue: text,
                  })}
                  value={String(cardValue.formatedValue)}
                />

                <TouchableOpacity onPress={() => setCardValue({
                  value: 0, formatedValue: formatIntl(0)
                })}>

                  <Feather style={styles.paymentErase} name="x-circle" size={25} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancel} onPress={toggleModal}>
                <Text style={styles.modalButtonsText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalConfirm} onPress={confirmPaymentAlert}>
                <Text style={styles.modalButtonsText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.eraseButton} onPress={navigateClientArea}>
          <Text style={styles.buttonText}>
            Voltar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={toggleModal}>
          <Text style={styles.buttonText}>
            Pagamento
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}