import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Location from './Components/Location'
import Photos from './Components/Photos'


class App extends Component {

  render() {
    return (
      <>
        <Location />
        <Photos />
      </>
    )
  }
}
export default App

const styles = StyleSheet.create({

})