import { View, Image, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import axios from 'axios'
import Cotizacion from './components/Cotizacion'


const App = () => {
    const [moneda, setMoneda] = useState('')
    const [criptomoneda, setCriptomoneda] = useState('')
    const [consultarApi, setConsultarApi] = useState(false)
    const [resultado, setResultado] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
      if(consultarApi){
        const cotizarCriptomoneda = async () => {
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
          const resultado = await axios.get(url)
        
          setLoading(true)

          setTimeout(() => {
            setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
            setConsultarApi(false)
            setLoading(false)
          }, 3000);
        }
        cotizarCriptomoneda()
      }
    }, [consultarApi])
    

    const spinner = loading ? <ActivityIndicator size='large' color='#5E49E2'/> : <Cotizacion resultado={resultado} />

  return (
    <ScrollView>
      <StatusBar backgroundColor='#5E49E2'/>
      <Header/>
      <Image 
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarApi={setConsultarApi}
        />
      </View>
      
      <View style={{marginTop:50}}>
        {spinner}
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imagen:{
    width: '100%',
    height: 150,
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App