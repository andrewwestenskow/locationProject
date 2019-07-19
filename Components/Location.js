import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

class Location extends Component {

  state = {
    latitude: '',
    longitude: ''
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
      console.log(position)
    })
  }

  render() {
    return (
      <View>
        <Button title='get location' onPress={this.getLocation} />
        <Text>latitude: {this.state.latitude}</Text>
        <Text>longitude: {this.state.longitude}</Text>
      </View>
    )
  }
}
export default Location

const styles = StyleSheet.create({

})