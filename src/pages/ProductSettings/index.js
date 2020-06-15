import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
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
  
  const [products, setProducts] = useState([]);
  async function loadProducts(){

    const response = await api.get('products');

    setProducts(response.data);
  }

  // Modal Add new product
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {

    // Set name and price to check if they are empty for add to db
    onChangeName('');
    onChangePrice('');
    setModalVisible(!isModalVisible);
  };

  // Modal Update Product
  const [updateModal, setUpdateModal] = useState(false);
  function toggleModalUpdate(name, price, id){

    onChangeNameUpdate(String(name));
    onChangePriceUpdate(String(price));
    setProductId(id);

    setUpdateModal(!updateModal);
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

    if(product.name == '' || product.price == ''){
      
      Alert.alert(
        "Erro ao cadastrar",
        "Nome e/ou preço vazio.",
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

      await api.post('products', product);
      
      setModalVisible(!isModalVisible);
      setNewProduct(newProduct + 1);
    }
  }


  const [nameUpdate, onChangeNameUpdate] = useState('');
  const [priceUpdate, onChangePriceUpdate] = useState('');
  const [productId, setProductId] = useState(0);
  
  const productUpdate = {
    name: nameUpdate,
    price: parseFloat(priceUpdate.replace(',','.').replace(' ','')),
  }

  // Update product on db
  async function modalUpdate(){

    if(nameUpdate == '' || priceUpdate == ''){
      
      Alert.alert(
        "Erro ao atualizar",
        "Nome e/ou preço vazio.",
        [
          { 
            text: "OK",
            
            onPress: () => {}
          }
        ],
        { cancelable: false }
      );
    } else {

      await api.put(`products/${productId}`, productUpdate);
      setNewProduct(newProduct + 1);
      setUpdateModal(!updateModal);
    }

  }

  async function deleteProduct(){

    await api.delete(`products/${productId}`);
    setNewProduct(newProduct + 1);
    setUpdateModal(!updateModal);
  }

  const deleteProductAlert = () =>
    Alert.alert(
      "Apagar Produto",
      "Deseja realmente apagar o produto?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { 
          text: "SIM",
          
          onPress: deleteProduct
        }
      ],
      { cancelable: false }
    );

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

          <Text style={[styles.productTagText, { minWidth: 90}]}> 
            Nome
          </Text>

          <Text style={[styles.productTagText]}>
            Preço             
          </Text>

          <Text style={styles.productTagText}>
            Editar          
          </Text>
        </View>
        
        <FlatList 
          style={styles.productList}
          data={products}
          keyExtractor={product => String(product.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({item: product }) => (
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

                <TouchableOpacity onPress={() => toggleModalUpdate(product.name, product.price, product.id)}>
                  <Feather name="edit" size={32} color="#EB5757"/>
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
            keyboardType={'numeric'}

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

      <Modal isVisible={updateModal}>
                  
        <View style={styles.modal}>
        
          <Text style={styles.modalTitle}>Atualizar Produto</Text>

          <TextInput
            style={styles.modalInput}
            value={nameUpdate}
            onChangeText={(text) => onChangeNameUpdate(text)}  
          />

          <TextInput
            style={styles.modalInput}
            value={priceUpdate}
            keyboardType={'numeric'}
            onChangeText={(text)=> onChangePriceUpdate(text)}  
          />  
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalCancel} onPress={toggleModalUpdate}>
              <Text style={styles.modalButtonsText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalDelete} onPress={deleteProductAlert}>
              <Text style={styles.modalButtonsText}>Deletar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalConfirm} onPress={modalUpdate}>
              <Text style={styles.modalButtonsText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
}