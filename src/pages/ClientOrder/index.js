import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import Moment from 'moment';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';

export default function ProductSettings() {

  // Routing 
  const navigation = useNavigation();
  function navigateToHome(){

    navigation.goBack(); 

  }
  
  function formatIntl(value){

    const formattedValue = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    return formattedValue;
  }

  const route = useRoute();
  const order = route.params.order;
  const clientName = route.params.name;

  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  // Load products from db
  useEffect (() => {
    
    api.get('products').then(response => {

      setProductsData(response.data);
    });

    const purchase = JSON.parse(order.products);
    const purchasedProducts = purchase.filter(prod => prod.quantity > 0);
    setProducts(purchasedProducts);
    
  }, [])

  return (

    <View style={styles.container}>
      
      <PageHeader>
        Cliente: {clientName}
      </PageHeader>

      <View style={styles.clientOrderContainer}>
                      
          <Text style={styles.clientOrderData}>Data: {Moment(order.created_at, 'MM/DD/YYYY').format('DD/MM/YY')}</Text>
        
          <View style={styles.orderInfoContainer}>

            <Text style={styles.orderInfoTag}>
              Tipo de pagamento:
            </Text>

            <Text style={styles.orderInfoText}>
              {order.paymentType}
            </Text>
          </View>

          <View style={styles.orderInfoContainer}>

            <Text style={styles.orderInfoTag}>
              Modo de pagamento:
            </Text>

            <Text style={styles.orderInfoText}>
              {order.paymentMode}
            </Text>
          </View>

          <View style={styles.orderInfoContainer}>

            <Text style={styles.orderInfoTag}>
              Valor Total: 
            </Text>

            <Text style={styles.orderInfoText}>
              {formatIntl(order.totalValue)}  
            </Text>

          </View>

          <View style={styles.orderInfoContainer}>

            <Text style={styles.orderInfoTag}>
              Valor Dinheiro: 
            </Text>

            <Text style={styles.orderInfoText}>
              {formatIntl(order.cashValue)}
            </Text>
          </View>

          <View style={styles.orderInfoContainer}>

            <Text style={styles.orderInfoTag}>
              Valor Cartão: 
            </Text>

            <Text style={styles.orderInfoText}>
              {formatIntl(order.cardValue)}
            </Text>
          </View>

          <Text style={styles.productTag}>
            Produtos Comprados:
          </Text>

          {products.length > 0 ? 
            <FlatList 
              style={styles.productList}
              data={products}
              keyExtractor={product => String(product.name)}
              showsVerticalScrollIndicator={false}
              renderItem={({item: product }) => (

              <View style={styles.productContainer}>

                <Text style={styles.productTextName}>
                  {product.name}
                </Text>

                <Text style={styles.productTextQuant}>
                  {product.quantity}
                </Text>

                <Text style={styles.productTextPrice}>
                  {productsData.map(prod => prod.name === product.name ? formatIntl(prod.price*product.quantity) : null)}
                </Text>

              </View>
            )}/>
          
          : 
            <Text style={styles.productDebt}>
              Pagamento de Divída.
            </Text>
          }
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}