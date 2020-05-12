import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Headline, Text, Subheading, Button,
         Paragraph, Dialog, Portal, FAB} from 'react-native-paper';

import axios from 'axios';         

import globalStyles from '../styles/globar';

const DetallesCliente = ({navigation, route}) => {

    const { id, nombre, telefono, correo, empresa } = route.params.item;

    const { guardarConsultarAPI } = route.params;

    const [alertaBorrar, guardarAlertaBorrar] = useState(false);

    const eliminarContacto = async () => {

        try {
            await axios.delete(`https://react-native-clientes.firebaseio.com/clientes/${id}.json`);
        } catch (error) {
            console.log(error);
        }
        guardarAlertaBorrar(false)
        navigation.goBack();
        guardarConsultarAPI(true);

    }

    return (
        <View style={globalStyles.contenedores}>
             <ScrollView
             showsVerticalScrollIndicator={false} >
                <Headline style={globalStyles.titulos}>{empresa}</Headline>
                <Text style={styles.texto}>Email: <Subheading>{correo}</Subheading></Text>
                <Text style={styles.texto}>Phone: <Subheading>{telefono}</Subheading></Text>

                <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Morbi laoreet magna dui, sed posuere massa tempus eu. 
                Pellentesque iaculis nibh at magna consequat tristique.
                Donec mattis, ipsum ut ornare eleifend, ex quam laoreet 
                ipsum, eu sodales erat tellus quis diam. Nunc semper mi 
                eget nulla sollicitudin accumsan. Donec consectetur felis
                a ligula auctor, ac accumsan enim bibendum. Donec tempus 
                interdum velit vel efficitur. Aliquam quis nibh in nulla 
                commodo sodales at at magna. Aliquam diam quam, tristique 
                sit amet scelerisque eu, egestas et dui. Vestibulum 
                suscipit cursus quam non euismod. Proin non odio a purus 
                maximus eleifend. Donec quis sem porttitor, scelerisque 
                nisi at, vehicula justo. 
                </Text>

                <Button 
                style={styles.boton}
                onPress={() => guardarAlertaBorrar(true)}
                mode="contained" 
                icon="cancel">
                    Delete Client
                </Button>


                <Portal>
                    <Dialog 
                    onDismiss={() => guardarAlertaBorrar(false)}
                    visible={alertaBorrar}>
                        <Dialog.Title>
                            ¿You want to delete this client?
                        </Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                A deleted contact cannot be recovered  
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button color="grey" onPress={() => guardarAlertaBorrar(false)}>Cancelar</Button>
                            <Button color="red" onPress={() => eliminarContacto()}>Si Eliminar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>   
                
                <FAB 
                color="white"
                icon="pencil"
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NuevoCliente", {cliente: route.params.item, guardarConsultarAPI} ) }
                />

        </View>
    );
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    boton: {
        marginTop: 50,
        backgroundColor: 'red',
        marginBottom: 20
    }
});

export default DetallesCliente;