import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import axios from 'axios';

import globalStyles from '../styles/globar';

const NuevoCliente = ({navigation, route}) => {

    const [id, guardarId] = useState('');
    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');

    const [alerta, guardarAlerta] = useState(false);

    const { guardarConsultarAPI } = route.params;

    useEffect(() => {
        if(route.params.cliente){
            const { id, nombre, telefono, correo, empresa } = route.params.cliente;

            guardarId(id)
            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo);
            guardarEmpresa(empresa);

        }
    },[])

    const guardarCliente = async () => {
        
        if(nombre === '' ||
            telefono === '' ||
            correo === '' ||
            empresa === ''){
                guardarAlerta(true);
                return;
        }

        const cliente = { nombre, telefono, correo, empresa }; 

        try {
            /*if(Platform.OS === 'android'){
                //android 
                await axios.post('http://10.0.2.2:3000/clientes', cliente);
            }else{
                //ios
                await axios.post('http://localhost:3000/clientes', cliente);
            }*/

            if(route.params.cliente){

                cliente.id = {id};
                axios.put(`https://react-native-clientes.firebaseio.com/clientes/${id}.json`, cliente);

            }else{

                const respuesta = await axios.post('https://react-native-clientes.firebaseio.com/clientes.json', cliente);

                const newId =respuesta.data.name;

                const updateCliente =  { id: newId, nombre, telefono, correo, empresa };

                await axios.put(`https://react-native-clientes.firebaseio.com/clientes/${newId}.json`, updateCliente);


            }

        } catch (error) {
            console.log(error);
        }

        //navigation.goBack();
        //navigation.navigate('Inicio')

        guardarId('');
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

        guardarConsultarAPI(true);
        if(route.params.cliente){
            navigation.goBack();
            navigation.goBack();
        }else{
            navigation.goBack();
        }

    }

    return (
        <ScrollView>
            <View style={globalStyles.contenedores}> 
                <Headline style={globalStyles.titulos}>{route.params.cliente ? "Edit" : "Add new client"}</Headline>

                <TextInput 
                    label = "Nombre"
                    placeholder = "Nombre"
                    onChangeText={ (texto) => guardarNombre(texto) }
                    value={nombre}
                    style={styles.input}
                />

                <TextInput 
                    label = "Telefono"
                    keyboardType={'numeric'}
                    placeholder = "Telefono"
                    onChangeText={ (texto) => guardarTelefono(texto) }
                    value={telefono}
                    style={styles.input}
                />

                <TextInput 
                    label = "Correo"
                    placeholder = "Correo"
                    keyboardType={'email-address'}
                    onChangeText={ (texto) => guardarCorreo(texto) }
                    value={correo}
                    style={styles.input}
                />

                <TextInput 
                    label = "Empresa"
                    placeholder = "Empresa"
                    onChangeText={ (texto) => guardarEmpresa(texto) }
                    value={empresa}
                    style={styles.input}
                />

                <Button 
                icon="pencil-circle" mode="contained" 
                style={styles.button}
                onPress={() => guardarCliente()}>
                    {route.params.cliente ? "Edit client" : "Save Client"}
                </Button>

                <Portal>
                    <Dialog 
                    onDismiss={() => guardarAlerta(false)}
                    visible={alerta}>
                        <Dialog.Title>
                            Error
                        </Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                Todos los campos son obligatorios
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button color="black" onPress={() => guardarAlerta(false)}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    },
    button: {
        marginBottom: 20,
        backgroundColor: "#0655bf"
    }
});

export default NuevoCliente;