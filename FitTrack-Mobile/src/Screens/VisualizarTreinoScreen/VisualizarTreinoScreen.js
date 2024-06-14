import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const VisualizarTreinoScreen = ({ route }) => {

  useEffect(() => {
    console.log(route.params);
  }, [])

  return (
    <View>
      <Text>VisualizarTreinoScreen</Text>
    </View>
  )
}

export default VisualizarTreinoScreen