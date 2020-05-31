import React, { useState, useEffect } from 'react';
import { Alert, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Modal from 'react-native-modal';

import api from '../../services/api';

import styles from './styles';

export default function ClientArea() {

  const navigation = useNavigation();

  function navigateToHome(){

    navigation.goBack(); 

  }

  function clientHistory(client) {

    navigation.navigate('ClientHistory', {

      name: client.name,
      debt: client.debt,
      id: client.id,
    });
  }

  function clientDeleteAlert(id, debt){

    if(debt != 0){

      Alert.alert(
        "Erro ao deletar cliente",
        "\nCliente referido tem contas a pagar.",
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

      Alert.alert(
        "Confirmar remoção de cliente",
        "\nDeseja realmente deletar este cliente?",
        [
          {
            text: "Não",
            style: "cancel"
          },
          { 
            text: "OK",
            
            onPress: () => clientDelete(id)
          }
        ],
        { cancelable: false }
      );
     
    }

  }

  async function clientDelete(id){

    console.log('cliente delete', id);
    await api.delete(`clients/${id}`);
    
    setNewClient(newClient + 1);
  }

  const [clients, setClients] = useState([]);

  async function loadData(){

    const response = await api.get('clients');

    setClients(response.data);
  }
   
  // Modal usage
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Dependency test for useEffect to load new product added
  const [newClient, setNewClient] = useState(0);

  const [clientName, onChangeClientName] = useState('');

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

  // Load clients from db
  useEffect (() => {

    loadData();
  }, [newClient])

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

      <Text style={styles.title}>
        Área de Clientes 
      </Text>

      <View style={styles.clientContainer}>

        <View style={styles.clientTags}>

          <Text>
            Nome
          </Text>
          <Text>
            Débito
          </Text>

          <Text></Text>
        </View>

        <FlatList 
          style={[styles.clientList, { marginTop: 0 }]}
          data={clients}
          keyExtractor={client => String(client.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: client }) => (

            <View style={styles.client}>

              <Text style={styles.clientName}>
                {client.name}
              </Text>
              <Text style={styles.clientDebt}>
                {Intl.NumberFormat('pt-BR', { 
                  style: 'currency',
                  currency: 'BRL',
                }).format(client.debt)}
              </Text>

              <TouchableOpacity style={styles.clientButton} onPress={() => clientDeleteAlert(client.id, client.debt)}>
                <Feather name="trash-2" size={32} color="#EB5757"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.clientButton} onPress={() => clientHistory(client)}>
                <Feather name="chevrons-right" size={32} color="#EB5757"/>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.eraseButton} onPress={navigateToHome}>
          <Text style={styles.buttonText}>
            Voltar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={toggleModal}>
          <Text style={styles.buttonText}>
            Cadastrar
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