import React, { useState, useEffect } from 'react';
import { Alert, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import styles from './styles';

export default function Order() {

  const [total, setTotal] = useState(0);

  const [qtd, setQtd] = useState([]);

  const navigation = useNavigation();

  function navigateToHome(){

    navigation.goBack(); 
  }

  function navigateToConfirm(){

    const productSelect = products.filter(product => product.qtd > 0 );
    
    // Check if at least 1 item has been added
    if (productSelect.length > 0) {
      
      navigation.navigate('OrderConfirmation', {
      
        qtd,
        total,
     }); 
    }

    else {
      
      Alert.alert(
        `Compra sem Produtos`,
        "Adicione pelo menos um item.",
        [
          
          { 
            text: "OK",
            
          }
        ],
        { cancelable: false }
      );
    }
    
  }

  // Load all products available
  const [products, setProducts] = useState([]);

  async function loadProducts(){

    const response = await api.get('products');

    setProducts(response.data);
    setQtd(response.data);
  }

  useEffect (() => {

    loadProducts(); 
    setTotal(0);
  }, [])


  function handleQuantity(type, price, id){
    
    const prod = qtd.filter(produto => produto.id === id);

    // Add item
    if(type === 1){

      prod[0].qtd += 1;

      //console.log('Teste filter : ', x[0].qtd);
      
      setTotal(total + price);
    } 
    // Subtract item
    else if (type === 2){

      if (total > 0){
        if(prod[0].qtd > 0){
          
          prod[0].qtd -= 1;
          setTotal(total - price);
        }
      }
    }
    // Erase quant
    else{

      const prod = qtd.filter(produto => produto.qtd > 0);

      prod.forEach(function(part, index) {
        
        prod[index].qtd = 0;
      });
      console.log(prod);
      setTotal(0);
    }
    
  }

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

      {/* TOTAL CONTAINER */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          TOTAL:
        </Text>

        <Text style={styles.totalText}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL', 
            }).format(total)}
        </Text>
      </View>

      {/* ORDERS CONTAINER */}
      <FlatList 
        style={styles.productList}
        data={products}
        keyExtractor={product => String(product.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: product }) => (
          <View style={styles.product}>

            <Text style={styles.productName}>
              {product.name}
            </Text>

            <TouchableOpacity style={styles.productButtons} onPress={() => handleQuantity(2, product.price, product.id)}>
              <Feather name="minus" size={32} color="#EB5757"/>
            </TouchableOpacity>

            <View style={styles.productQuant}>

              <Text style={styles.productQuantText}>
                {product.qtd}
              </Text>
            </View>

            <TouchableOpacity style={styles.productButtons} onPress={() => handleQuantity(1,product.price, product.id)}>
              <Feather name="plus" size={32} color="#EB5757"/>
            </TouchableOpacity>
          </View>
        )}
      />
      
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={[styles.confirmButton,
        {
          backgroundColor: '#aaafff' ,
        }]} onPress={navigateToHome}>
          <Text style={styles.orderButtons}>
            Voltar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eraseButton} onPress={() => handleQuantity(3, '', '')}>
          <Text style={styles.orderButtons}>
            Apagar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={navigateToConfirm}>
          <Text style={styles.orderButtons}>
            Avançar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}