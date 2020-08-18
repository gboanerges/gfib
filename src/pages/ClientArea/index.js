import React, { useState, useEffect } from 'react';
import { Alert, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Modal from 'react-native-modal';

import api from '../../services/api';

import styles from './styles';
import PageHeader from '../../components/PageHeader';

export default function ClientArea() {

  const navigation = useNavigation();

  function navigateToHome(){

    navigation.navigate('Home'); 
  }

  function clientHistory(client) {

    navigation.push('ClientHistory', {

      name: client.name,
      debt: client.debt,
      id: client.id,
    });
  }

  const [clients, setClients] = useState([]);

  async function loadData(){

    const response = await api.get('clients');

    setClients(response.data);
  }
   
  // Modal usage
  const [isModalRegisterVisible, setModalRegisterVisible] = useState(false);
  const toggleModalRegister = () => {
    setModalRegisterVisible(!isModalRegisterVisible);
  };

  const [isModalUpdateVisible, setModalUpdateVisible] = useState(false);
  function toggleModalUpdate(id){
    
    setModalUpdateVisible(!isModalUpdateVisible);
    setClientIdUpdate(id);
  };

  // Dependency test for useEffect to load new product added
  const [newClient, setNewClient] = useState(0);

  const [clientNameRegister, setClientNameRegister] = useState('');
  const [clientNameUpdate, setClientNameUpdate] = useState('');
  const [clientIdUpdate, setClientIdUpdate] = useState(0);

  // Add new client on db
  async function modalConfirm(operation){

    setClientNameRegister('');
    setClientNameUpdate('');

    if(operation == 'register'){

      if(clientNameRegister == ''){
      
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

        await api.post('clients', {
          clientName: clientNameRegister
        });
      
        setModalRegisterVisible(!isModalRegisterVisible);
        setNewClient(newClient + 1);
      }
    }
    else if(operation == 'update') {

      if(clientNameUpdate == ''){
      
        Alert.alert(
          "Erro ao atualizar cliente",
          "Digite algum nome",
          [
            { 
              text: "OK",
              
              onPress: () => {}
            }
          ],
          { cancelable: false }
        );
      } else {

        await api.put(`clients/${clientIdUpdate}`, {

          name: clientNameUpdate,
          debt: '',
        });

        setModalUpdateVisible(!isModalUpdateVisible);
        setNewClient(newClient + 1);
      }
    }
  }

  // Load clients from db
  useEffect (() => {
    
    loadData();
  }, [newClient]);

  return (

    <View style={styles.container}>

      <PageHeader>
        Área de Clientes 
      </PageHeader>

      <View style={styles.clientContainer}>

        <View style={styles.clientTags}>

          <Text>
            Nome
          </Text>
          <Text>
            Débito
          </Text>

          <Text>
            Editar
          </Text>
          
          <Text>
            <Feather name="chevron-right" size={26} color="#000"/>
          </Text>
        </View>

        <FlatList 
          style={[{ marginTop: 0 }]}
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

              <TouchableOpacity style={styles.clientButton} onPress={() => toggleModalUpdate(client.id)}>
                <Feather name="edit" size={26} color="#EB5757"/>
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

        <TouchableOpacity style={styles.confirmButton} onPress={toggleModalRegister}>
          <Text style={styles.buttonText}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <Modal animationInTiming={800} animationOutTiming={800} isVisible={isModalRegisterVisible}>
        <View style={styles.modal}>

          <Text style={styles.modalTitle}>Cadastro de Cliente</Text>

          <TextInput
            style={styles.modalInput}
            placeholder="Nome do Cliente"
            onChangeText={text => setClientNameRegister(text)}  
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalCancel} onPress={toggleModalRegister}>
              <Text style={styles.modalButtonsText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalConfirm} onPress={() => modalConfirm('register')}>
              <Text style={styles.modalButtonsText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal isVisible={isModalUpdateVisible}>
        <View style={styles.modal}>

          <Text style={styles.modalTitle}>Alterar Nome do Cliente</Text>

          <TextInput
            style={styles.modalInput}
            placeholder="Nome do Cliente"
            onChangeText={text => setClientNameUpdate(text)}  
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalCancel} onPress={toggleModalUpdate}>
              <Text style={styles.modalButtonsText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalConfirm} onPress={() => modalConfirm('update')}>
              <Text style={styles.modalButtonsText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>


  );
}