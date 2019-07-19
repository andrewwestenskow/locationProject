import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

class Location extends Component {

  async componentDidMount(){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(position)
    })
  }

  render() {
    return (
      <View>
        <Button title='get location' onPress={this.getLocation} />
      </View>
    )
  }
}
export default Location

const styles = StyleSheet.create({

})