import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Modal from 'react-native-modal';

import api from '../../services/api';

import styles from './styles';

export default function ProductSettings() {

  // Routing 
  const navigation = useNavigation();
  function navigateToHome(){

    navigation.goBack(); 

  }
  
  const [productId, setProductId] = useState(false);

  function alterProduct(id){
    
    if(id === productId){

      setProductId(0);
    }else 
      setProductId(id);
 }

  const [products, setProducts] = useState([]);
  async function loadProducts(){

    const response = await api.get('products');

    setProducts(response.data);
  }

  // Modal usage
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [name, onChangeName] = useState('');
  const [price, onChangePrice] = useState('');
  
  const product = {
    name,
    price
  }

  // Dependency test for useEffect to load new product added
  const [newProduct, setNewProduct] = useState(0);

  // Add new product on db
  async function modalConfirm(){

    await api.post('products', product);
    
    setModalVisible(!isModalVisible);
    setNewProduct(newProduct + 1);
  }

  // Load products from db
  useEffect (() => {

    loadProducts();
  }, [newProduct])

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
        Configurações de produtos
      </Text>

      <View style={styles.productContainer}>

        <View style={styles.productTag}>

          <Text style={styles.productTagText}> 
            Nome
          </Text>

          <Text style={styles.productTagText}>
            Preço             
          </Text>

          <Text>
            .
          </Text>
        </View>
        
        <FlatList 
          style={styles.productList}
          data={products}
          keyExtractor={product => String(product.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({item: product }) => (
            <View style={styles.p}>
              <View style={styles.product}>

                <Text style={styles.productName}>
                  {product.name}
                </Text>

                <Text style={styles.productPriceText}>
                  {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL', 
                  }).format(product.price)}
                </Text>

                {/* <TouchableOpacity onPress={() => {}}>
                  <Feather name="edit" size={32} color="#EB5757"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}>
                  <Feather name="trash-2" size={32} color="#EB5757"/>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => alterProduct(product.id)}>
                  <Feather name="chevrons-down" size={32} color="#EB5757"/>
                </TouchableOpacity>
                
              </View>

              {/* Se os ids forem iguais, retorna a view para
                  alterar produto, senao retorna null */}
              { productId === product.id ? 
                <View  style={styles.product}>
                  <TextInput
                    value={product.name}
                  />
                </View>
              
                : null}

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

          <Text style={styles.modalTitle}>Cadastro de Produtos</Text>

          <TextInput
            style={styles.modalInput}
            placeholder="Nome do Produto"
            onChangeText={text => onChangeName(text)}  
          />

          <TextInput
            style={styles.modalInput}
            placeholder="Preço"
            onChangeText={text => onChangePrice(text)}  
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