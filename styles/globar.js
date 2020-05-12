import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedores: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: '3%'
    },
    titulos: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        fontSize: 30
    },
    fab: {
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 10,
        backgroundColor: '#f21d59'
    }
});

export default globalStyles;