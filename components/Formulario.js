import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import axios from 'axios'


const Formulario = ({moneda, setMoneda, criptomoneda, setCriptomoneda, setConsultarApi}) => {
    const [criptomonedas, setCriptomonedas] = useState([])

    useEffect(() => {
      const consultarAPI = async() => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        const resultado = await axios.get(url)
        setCriptomonedas(resultado.data.Data)
      }
      consultarAPI()
    }, [])
    


    const obtenerMoneda = (moneda) => {
        setMoneda(moneda)
    }
    const obtenerCriptomoneda = (cripto) => {
        setCriptomoneda(cripto)
    }

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta()
            return
        }
        setConsultarApi(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Todos los campos son obligatprios',
            [
                {text: 'OK'}
            ]
        )
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Moneda</Text>

      <Picker
        selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda)}
      >
        <Picker.Item label='Seleccione' value=''/>
        <Picker.Item label='Dolar' value='USD'/>
        <Picker.Item label='Euro' value='EUR'/>
        <Picker.Item label='Libra Esterlina' value='GBP'/>
        <Picker.Item label='Peso Argentino' value='ARS'/>
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>

      <Picker
        selectedValue={criptomoneda}
        onValueChange={cripto => obtenerCriptomoneda(cripto)}
      >
        <Picker.Item label='Seleccione' value=''/>
        {criptomonedas.map(cripto => (
            <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>            
        ))}
      </Picker>

      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}
      >
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>

    </View>
  )
}

const styles = StyleSheet.create({
    label:{
        fontFamily:'Lato-Black',
        fontSize:22,
        marginVertical:20,
        textTransform:'uppercase'
    },
    btnCotizar:{
        backgroundColor:'#5E49E2',
        padding: 10,
        marginTop:20,
        borderRadius:5,
    },
    textoCotizar:{
        color: '#FFF',
        fontSize:18,
        fontFamily: 'Lato-Black',
        textTransform:'uppercase',
        textAlign:'center'
    }
    
});

export default Formulario