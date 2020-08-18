import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

const PageHeader = ({ children }) => {

    const navigation = useNavigation();

    return(

        <View>

            <View style={styles.header}>
                <Text style={{ fontSize: 32 }}>
                LOGO
                </Text>
                
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={32} color="#EB5757"/>
                </TouchableOpacity>
            </View>
            
            {children && 
                <View style={styles.pageTitle}>
                    <Text style={styles.title}>

                        {children}
                    </Text>
                </View>
            }
        </View>
    )
}

export default PageHeader;