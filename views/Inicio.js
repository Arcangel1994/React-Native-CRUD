import React, { useEffect, useState } from 'react';
import { Text, Platform, FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { List, Headline, Button, FAB } from 'react-native-paper';

import globalStyles from '../styles/globar';

import axios from 'axios';

const Inicio = ({navigation}) => {

    const [clientes, guardarClientes] = useState([])

    const [consultarAPI, guardarConsultarAPI] = useState(true)

    useEffect(() => {
        const obtenerClientesApi = async () => {
            try {
                const resultado = await axios.get('https://react-native-clientes.firebaseio.com/clientes.json');
                const result = Object.keys(resultado.data).map(key => (resultado.data[key]));
                guardarClientes(result);
                guardarConsultarAPI(false);
            } catch (error) {
                console.log(error);
                guardarClientes([]);
                guardarConsultarAPI(false);
            }
        }
        
        if(consultarAPI){
            obtenerClientesApi();
        }

    }, [consultarAPI]);

    return (
        <View style={globalStyles.contenedores}>

            <Button color="#1774f2" icon="plus-circle" onPress={() => navigation.navigate("NuevoCliente", {guardarConsultarAPI} ) } >New client</Button>

            {
                clientes.length > 0 
                ? 
                <View>
                <Headline style={globalStyles.titulos}>{clientes.length > 0 ? "Clients" : "There is no customer"}</Headline>

                <FlatList 
                    data={clientes}
                    keyExtractor={ cliente => (cliente.id).toString() }
                    renderItem={ ({item}) => (
                        <List.Item 
                            title={item.nombre}
                            description={item.empresa}
                            onPress={() => navigation.navigate("DetallesCliente", { item, guardarConsultarAPI })}
                        />
                    )}
                />
                </View>
                : 
                <View style={{marginTop: 50}}>
                    <ActivityIndicator size="large" color="#0655bf"/> 
                </View>
            }

            <FAB 
                color="white"
                icon="plus"
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NuevoCliente", {guardarConsultarAPI} ) }
            />

        </View>
    );
}

const styles = StyleSheet.create({

});

export default Inicio;