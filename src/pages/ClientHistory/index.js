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

  const [toggleUnpaid, setToggleUnpaid] = useState(true);
  const [togglePaid, setTogglePaid] = useState(true);

  function confirmPaymentAlert(order) {
    console.log('ALERT', order.value);
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
          
          onPress: () => confirmPayment(order)
        }
      ],
      { cancelable: false }
    );
  }

  async function confirmPayment(order){

    console.log('CONFIRM', order.id);
    console.log('CONFIRM client', clientId);
    // Paying the whole order at once
    await api.put(`orders/${order.id}`, {

      idClient: clientId,
      value: order.value
    });

    setUpdateOrder(updateOrder + 1);

  }

  const route = useRoute();
  const clientName = route.params.name;
  const clientId = route.params.id;

  async function loadData(){

    const response = await api.get(`orders/${clientId}`);
    
    setClientUnpaidHistory(response.data.filter(order => order.receivedValue < order.value));
    
    setClientPaidHistory(response.data.filter(order => order.receivedValue == order.value));

    // ALTERAR FUNÇÃO
    setClientDebt(sumObject(response.data.filter(order => order.receivedValue < order.value), 'value'));
    
  }
  
  const [clientUnpaidHistory, setClientUnpaidHistory] = useState([]);
  const [clientPaidHistory, setClientPaidHistory] = useState([]);
  // Dependency test for useEffect to load new product added
  const [updateOrder, setUpdateOrder] = useState(0);
  const [clientDebt, setClientDebt] = useState(0);

  function sumObject (items, prop){
    // A == 0 and b is the object, access prop passed
    return items.reduce( function(a, b){

      return a + b[prop];
    }, 0);
  }

  // Load client orders from db
  useEffect (() => {

    loadData();
  }, [updateOrder])

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
        
        { clientUnpaidHistory.length > 0 || clientPaidHistory.length > 0 ?
        
        <View>
          
          <TouchableOpacity style={styles.clientButton} onPress={() => setToggleUnpaid(!toggleUnpaid)}>
            <View style={styles.togglePaid}>
              <Text>
                A pagar
              </Text>

              { toggleUnpaid ? 

                <Feather name="chevrons-up" size={32} color="#EB5757"/>
                
                : <Feather name="chevrons-down" size={32} color="#EB5757"/>
              }
            </View>
          </TouchableOpacity>
          
          { toggleUnpaid && clientUnpaidHistory. length > 0 ? 
          <View>
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
              data={clientUnpaidHistory}
              keyExtractor={order => String(order.id)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: order }) => (

                <View style={styles.order}>

                  <Text style={styles.orderDate}>
                    {Moment(order.created_at).format('DD/MM/YY')}
                  </Text>
                  <Text style={styles.orderValue}>
                    {Intl.NumberFormat('pt-BR', { 
                      style: 'currency',
                      currency: 'BRL',
                    }).format(order.value)}
                  </Text>

                  <Text style={styles.orderValue}>
                    {Intl.NumberFormat('pt-BR', { 
                      style: 'currency',
                      currency: 'BRL',
                    }).format(order.receivedValue)}
                  </Text>

                  <TouchableOpacity style={[styles.clientButton, { backgroundColor: 'white'}]} onPress={() => confirmPaymentAlert(order)}>
                    <Feather name="dollar-sign" size={32} color="#EB5757"/>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

            : null }      

              <TouchableOpacity style={styles.clientButton} onPress={() => setTogglePaid(!togglePaid)}>
                <View style={styles.togglePaid}>
                  <Text>
                    Compras pagas
                  </Text>

                  { togglePaid ? 
                      <Feather name="chevrons-up" size={32} color="#EB5757"/>
                    
                    : <Feather name="chevrons-down" size={32} color="#EB5757"/>
                  }
                </View>
              </TouchableOpacity>
              
              { togglePaid && clientPaidHistory.length > 0 ? 
                <View>
                  <View style={styles.unpaidTags}>

                    <Text style={[styles.unpaidTagsText]}>
                      Data
                    </Text>
                    
                    <Text style={styles.unpaidTagsText}>
                      Valor Total
                    </Text>

                    <Text style={styles.unpaidTagsText}>
                      Data Recebido
                    </Text>

                  </View>
                    
                  <FlatList 
                    style={[styles.clientList, { marginTop: 0 }]}
                    data={clientPaidHistory}
                    keyExtractor={order => String(order.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: order }) => (

                      <View style={styles.order}>

                        <Text style={styles.orderDate}>
                          {Moment(order.created_at).format('DD/MM/YY')}
                        </Text>
                        <Text style={styles.orderValue}>
                          {Intl.NumberFormat('pt-BR', { 
                            style: 'currency',
                            currency: 'BRL',
                          }).format(order.value)}
                        </Text>

                        <Text style={styles.orderValue}>
                          Data 
                        </Text>
                          
                      </View>
                    )}
                  />
                </View>
                : null}      
        </View>
          : <Text style={styles.warningOrder}>Não há histórico de compras</Text> }
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.eraseButton} onPress={navigateClientArea}>
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